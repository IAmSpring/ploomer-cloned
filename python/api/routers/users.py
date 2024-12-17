"""
Users router for handling user-related operations.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    role: str = "USER"

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    is_active: bool = True

    class Config:
        orm_mode = True

@router.get("/", response_model=List[User])
async def get_users():
    """Get all users."""
    # TODO: Implement database integration
    return []

@router.post("/", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user."""
    # TODO: Implement database integration
    return {
        "id": 1,
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "is_active": True
    } 