from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from passlib.context import CryptContext

from database import Base, engine, SessionLocal

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    """Hash plain password using bcrypt"""
    return pwd_context.hash(password)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Create table in database
Base.metadata.create_all(bind=engine)

# ---------------- CRUD OPERATIONS ----------------

def create_user(username, email, password, role):
    session = SessionLocal()
    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        role=role
    )
    session.add(user)
    session.commit()
    session.close()


def get_user(email):
    session = SessionLocal()
    user = session.query(User).filter(User.email == email).first()
    session.close()
    return user


def update_user(email, new_role):
    session = SessionLocal()
    user = session.query(User).filter(User.email == email).first()
    if user:
        user.role = new_role
        session.commit()
    session.close()


def delete_user(email):
    session = SessionLocal()
    user = session.query(User).filter(User.email == email).first()
    if user:
        session.delete(user)
        session.commit()
    session.close()