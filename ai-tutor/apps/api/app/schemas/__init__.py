from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class StudentProfileBase(BaseModel):
    name: str
    grade: Optional[int] = None
    board: Optional[str] = None
    subjects: Optional[List[str]] = None

class StudentProfileCreate(StudentProfileBase):
    user_id: UUID
    parent_id: Optional[UUID] = None

class StudentProfileResponse(StudentProfileBase):
    id: UUID
    user_id: UUID
    parent_id: Optional[UUID]
    elo_ratings: Dict[str, Any]
    onboarded: bool

    model_config = {"from_attributes": True}


class TextbookResponse(BaseModel):
    id: UUID
    student_id: UUID
    subject: Optional[str] = None
    grade: Optional[int] = None
    board: Optional[str] = None
    status: str
    chunk_count: Optional[int] = None
    uploaded_at: datetime

    model_config = {"from_attributes": True}


class SessionResponse(BaseModel):
    id: UUID
    student_id: UUID
    subject: Optional[str] = None
    chapter: Optional[str] = None
    started_at: datetime
    ended_at: Optional[datetime] = None
    duration_min: Optional[int] = None

    model_config = {"from_attributes": True}
