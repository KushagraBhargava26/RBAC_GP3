from pathlib import Path
import json
from typing import Dict, List, Optional, Callable, Any
import logging
import base64

from fastapi import Depends, HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

logger = logging.getLogger("rbac")


def _decode_jwt_no_verify(token: str) -> Dict[str, Any]:
    """Decode JWT without verifying signature.

    Tries to use PyJWT if available, otherwise decodes payload part.
    """
    try:
        import jwt as _jwt  # PyJWT

        return _jwt.decode(token, options={"verify_signature": False})
    except Exception:
        try:
            parts = token.split(".")
            if len(parts) < 2:
                return {}
            payload = parts[1]
            padded = payload + "=" * (-len(payload) % 4)
            data = base64.urlsafe_b64decode(padded)
            return json.loads(data)
        except Exception:
            return {}


def _extract_role_from_payload(payload: Dict[str, Any]) -> Optional[str]:
    if not payload:
        return None
    # Common claim names
    if "role" in payload and isinstance(payload["role"], str):
        return payload["role"]
    if "roles" in payload:
        roles = payload["roles"]
        if isinstance(roles, list) and roles:
            return roles[0]
        if isinstance(roles, str):
            return roles
    # fallback to 'scope' or 'permissions'
    if "scope" in payload and isinstance(payload["scope"], str):
        return payload["scope"]
    return None


def require_role_deps(required: List[str]):
    """Returns a FastAPI dependency (use with `Depends(require_role_deps([...]))`)."""

    async def _dep(request: Request):
        auth = request.headers.get("authorization", "")
        if not auth.lower().startswith("bearer "):
            logger.warning("Missing Authorization header on %s %s", request.method, request.url.path)
            raise HTTPException(status_code=401, detail="Missing Authorization header")
        token = auth.split(None, 1)[1]
        payload = _decode_jwt_no_verify(token)
        role = _extract_role_from_payload(payload)
        allowed = role in set(required) if role else False
        logger.info("Access attempt path=%s method=%s role=%s allowed=%s", request.url.path, request.method, role, allowed)
        if not allowed:
            raise HTTPException(status_code=403, detail="Forbidden")
        return True

    return Depends(_dep)


def require_role(required: List[str]) -> Callable:
    """Decorator to attach required roles metadata to endpoint functions.

    The `RBACMiddleware` will read `._required_roles` from the routed endpoint
    and enforce the check. Use as `@require_role(['finance','c-level'])` above
    a route function.
    """

    def _decorator(func: Callable) -> Callable:
        setattr(func, "_required_roles", set(required))
        return func

    return _decorator


class RBACMiddleware(BaseHTTPMiddleware):
    """RBAC middleware that checks endpoint metadata and a permissions file.

    Order of checks:
    - If the routed endpoint has `_required_roles` attribute (set by `@require_role`), enforce it.
    - Otherwise, check the `permissions.json` mapping (exact path match).
    - If neither exists, the request passes through.
    """

    def __init__(self, app, permissions_path: str = None):
        super().__init__(app)
        self.permissions = self._load_permissions(permissions_path) if permissions_path else {"endpoints": {}}

    def _load_permissions(self, path: str) -> Dict[str, List[str]]:
        p = Path(path)
        if not p.exists():
            return {"endpoints": {}}
        try:
            return json.loads(p.read_text())
        except Exception:
            return {"endpoints": {}}

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        endpoint = request.scope.get("endpoint")

        # 1) Check endpoint decorator metadata
        required_roles = None
        if endpoint is not None:
            required_roles = getattr(endpoint, "_required_roles", None)

        # 2) Fallback to permissions.json mapping
        if required_roles is None:
            endpoints_map = self.permissions.get("endpoints", {})
            allowed = endpoints_map.get(path)
            required_roles = set(allowed) if allowed else None

        # If no RBAC requirement, allow
        if not required_roles:
            return await call_next(request)

        # Extract role from Authorization header
        auth = request.headers.get("authorization", "")
        if not auth.lower().startswith("bearer "):
            logger.warning("Access denied (no token) path=%s method=%s", request.url.path, request.method)
            return JSONResponse({"detail": "Missing Authorization header"}, status_code=401)

        token = auth.split(None, 1)[1]
        payload = _decode_jwt_no_verify(token)
        role = _extract_role_from_payload(payload)

        allowed = role in required_roles if role else False
        logger.info("Access attempt path=%s method=%s role=%s allowed=%s", path, request.method, role, allowed)

        if not allowed:
            return JSONResponse({"detail": "Forbidden"}, status_code=403)

        return await call_next(request)

