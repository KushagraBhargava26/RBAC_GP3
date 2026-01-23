"""
Configuration settings for the RBAC Chatbot API.
Loads environment variables and provides app settings.
"""

import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import List

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # App Settings
    APP_NAME: str = "RBAC Chatbot API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS Settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000", "*"]
    
    # Database Settings (for future use)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./rbac_chatbot.db")
    
    # Vector DB Settings
    CHROMADB_PATH: str = os.getenv("CHROMADB_PATH", "../week 3/output/vector_db")
    
    # JWT Settings (for authentication)
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"
        extra = "allow"


# Create settings instance
settings = Settings()
