
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional

# JWT utilities (assumed to be provided already)
from src.utils.jwt_handler import (
    create_access_token,
    create_refresh_token,
    decode_token,
    blacklist_token,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


# ---------- Schemas ----------

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    username: str
    role: Optional[str] = None


# ---------- Routes ----------

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    # Dummy authentication (replace with DB logic later)
    if data.username != "admin" or data.password != "admin123":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    access_token = create_access_token({"sub": data.username})
    refresh_token = create_refresh_token({"sub": data.username})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.post("/logout")
def logout(token: str):
    blacklist_token(token)
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
def get_current_user(token: str):
    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    return {
        "username": payload.get("sub"),
        "role": payload.get("role")
    }


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(data: RefreshRequest):
    payload = decode_token(data.refresh_token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    new_access_token = create_access_token({"sub": payload.get("sub")})
    new_refresh_token = create_refresh_token({"sub": payload.get("sub")})

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }
