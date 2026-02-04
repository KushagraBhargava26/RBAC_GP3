from typing import List
from fastapi import Header, HTTPException, Depends


def parse_roles_header(x_roles: str = Header(default="")) -> List[str]:
    return [r.strip() for r in x_roles.split(",") if r.strip()]


def require_roles(required: List[str]):
    def _dep(user_roles: List[str] = Depends(parse_roles_header)) -> bool:
        if set(user_roles).intersection(set(required)):
            return True
        raise HTTPException(status_code=403, detail="Forbidden")

    return _dep
