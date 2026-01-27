import jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import json
import os

# Load configuration
config_path = os.path.join(os.path.dirname(__file__), '../../config/auth_config.json')
with open(config_path, 'r') as f:
    AUTH_CONFIG = json.load(f)

SECRET_KEY = AUTH_CONFIG.get('secret_key', 'your-secret-key-here')
ALGORITHM = AUTH_CONFIG.get('algorithm', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = AUTH_CONFIG.get('access_token_expire_minutes', 30)
REFRESH_TOKEN_EXPIRE_DAYS = AUTH_CONFIG.get('refresh_token_expire_days', 7)


class TokenError(Exception):
    """Base exception for token-related errors"""
    pass


class ExpiredTokenError(TokenError):
    """Exception raised when token is expired"""
    pass


class InvalidTokenError(TokenError):
    """Exception raised when token is invalid"""
    pass


def create_access_token(user_id: str, role: str) -> str:
    """
    Create a JWT access token with user_id and role claims.
    
    Args:
        user_id: The user's ID
        role: The user's role
        
    Returns:
        Encoded JWT token string
    """
    payload = {
        'user_id': user_id,
        'role': role,
        'type': 'access',
        'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        'iat': datetime.utcnow()
    }
    
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(user_id: str) -> str:
    """
    Create a JWT refresh token for obtaining new access tokens.
    
    Args:
        user_id: The user's ID
        
    Returns:
        Encoded JWT token string
    """
    payload = {
        'user_id': user_id,
        'type': 'refresh',
        'exp': datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        'iat': datetime.utcnow()
    }
    
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Dict[str, Any]:
    """
    Verify and decode a JWT token.
    
    Args:
        token: The JWT token to verify
        
    Returns:
        Dictionary containing the token payload
        
    Raises:
        ExpiredTokenError: If the token has expired
        InvalidTokenError: If the token is invalid or malformed
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise ExpiredTokenError("Token has expired")
    except jwt.InvalidTokenError as e:
        raise InvalidTokenError(f"Invalid token: {str(e)}")
    except Exception as e:
        raise InvalidTokenError(f"Error verifying token: {str(e)}")


def hash_password(password: str) -> str:
    """
    Hash a plain text password using bcrypt.
    
    Args:
        password: The plain text password to hash
        
    Returns:
        Hashed password string
    """
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain text password against a hashed password.
    
    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to compare against
        
    Returns:
        True if password matches, False otherwise
    """
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception as e:
        print(f"Error verifying password: {str(e)}")
        return False


def decode_token_without_verification(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode a token without verifying its signature (use with caution).
    Useful for debugging or extracting claims before validation.
    
    Args:
        token: The JWT token to decode
        
    Returns:
        Dictionary containing the token payload, or None if decoding fails
    """
    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload
    except Exception as e:
        print(f"Error decoding token: {str(e)}")
        return None
