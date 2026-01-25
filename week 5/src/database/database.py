from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Absolute path of this file: week5/src/database/database.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path to data folder: week5/src/data
DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "data"))

# Ensure data directory exists (CRITICAL FIX)
os.makedirs(DATA_DIR, exist_ok=True)

# SQLite database file path
DB_PATH = os.path.join(DATA_DIR, "users.db")

# Create SQLite engine
engine = create_engine(f"sqlite:///{DB_PATH}", echo=False)

# Session & Base
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()