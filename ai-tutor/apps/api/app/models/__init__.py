from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime, Text, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, CheckConstraint("role IN ('student', 'parent', 'admin')"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student_profile = relationship("StudentProfile", back_populates="user", uselist=False, foreign_keys="[StudentProfile.user_id]")
    children = relationship("StudentProfile", back_populates="parent", foreign_keys="[StudentProfile.parent_id]")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    parent_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    name = Column(String, nullable=False)
    grade = Column(Integer)
    board = Column(String) # CBSE/ICSE/State/IB
    subjects = Column(JSONB) # ['Math','Science']
    elo_ratings = Column(JSONB, default={}) # {'Math.Chapter1': 1000, ...}
    onboarded = Column(Boolean, default=False)
    consent_recorded_at = Column(DateTime(timezone=True), nullable=True)
    cached_metrics = Column(JSONB, default={})

    user = relationship("User", foreign_keys=[user_id], back_populates="student_profile")
    parent = relationship("User", foreign_keys=[parent_id], back_populates="children")
    textbooks = relationship("Textbook", back_populates="student")
    sessions = relationship("Session", back_populates="student")


class Textbook(Base):
    __tablename__ = "textbooks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("student_profiles.id"))
    subject = Column(String)
    grade = Column(Integer)
    board = Column(String)
    s3_key = Column(String)
    status = Column(String, CheckConstraint("status IN ('uploading','indexing','ready','failed')"))
    chunk_count = Column(Integer)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("StudentProfile", back_populates="textbooks")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("student_profiles.id"))
    subject = Column(String)
    chapter = Column(String)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True), nullable=True)
    duration_min = Column(Integer, nullable=True)
    transcript = Column(JSONB) # [{role, content, ts}]
    elo_delta = Column(JSONB) # per-chapter ELO changes this session

    student = relationship("StudentProfile", back_populates="sessions")
    incidents = relationship("BehaviorIncident", back_populates="session")


class BehaviorIncident(Base):
    __tablename__ = "behavior_incidents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"))
    student_id = Column(UUID(as_uuid=True), nullable=True)
    type = Column(String) # 'gaze_away','no_face','phone_detected'
    photo_url = Column(String, nullable=True)
    notified_at = Column(DateTime(timezone=True), nullable=True)
    ts = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("Session", back_populates="incidents")


class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), nullable=True)
    subject = Column(String)
    chapter = Column(String)
    score = Column(Float)
    max_score = Column(Float)
    answers = Column(JSONB) # [{q_id, earned, max, type, feedback}]
    taken_at = Column(DateTime(timezone=True), server_default=func.now())
