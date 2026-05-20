from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models import StudentProfile
from app.services.elo_service import seed_elo_from_diagnostic

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

class OnboardingPayload(BaseModel):
    grade: int
    board: str
    subjects: List[str]
    diagnostic_score_pct: float

@router.post("/")
async def submit_onboarding(payload: OnboardingPayload, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
        
    profile.grade = payload.grade
    profile.subjects = payload.subjects
    profile.onboarded = True
    
    # Seed initial ELO based on diagnostic performance
    # For every subject chosen, initialize the chapter 'Diagnostic' to the seeded score
    # In a real app, you would seed specific chapters based on the textbook.
    initial_elo = seed_elo_from_diagnostic(payload.diagnostic_score_pct)
    
    ratings = dict(profile.elo_ratings or {})
    for subj in payload.subjects:
        ratings[f"{subj}.Diagnostic"] = initial_elo
    profile.elo_ratings = ratings
    
    db.commit()
    return {"status": "success", "seeded_elo": initial_elo}
