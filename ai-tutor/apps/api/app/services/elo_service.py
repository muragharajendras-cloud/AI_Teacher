from sqlalchemy.orm import Session
from app.models import StudentProfile

def get_elo(db: Session, student_id: str, subject: str, chapter: str) -> int:
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    if not student or not student.elo_ratings:
        return 1000
    
    key = f"{subject}.{chapter}"
    return student.elo_ratings.get(key, 1000)

def seed_elo_from_diagnostic(pct_correct: float) -> int:
    if pct_correct >= 0.80: return 1200   # advanced
    if pct_correct >= 0.60: return 1000   # grade-level
    if pct_correct >= 0.40: return 800    # needs support
    return 600                            # foundational gaps

def update_elo_from_test(db: Session, student_id: str, subject: str, chapter: str, pct_score: float) -> dict:
    current = get_elo(db, student_id, subject, chapter)
    
    # Score >= 70% = correct signal, < 50% = wrong signal
    if pct_score >= 0.70:   
        delta = 25
    elif pct_score >= 0.50: 
        delta = 5
    elif pct_score >= 0.30: 
        delta = -10
    else:                   
        delta = -20
        
    new_elo = max(100, min(2000, current + delta))
    
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    if student:
        # Copy to avoid SQLAlchemy dict mutation issues
        ratings = dict(student.elo_ratings or {})
        key = f"{subject}.{chapter}"
        ratings[key] = new_elo
        
        # In SQLAlchemy JSONB, we must assign a new dict or use flag_modified
        student.elo_ratings = ratings
        db.commit()
        
    return { 'old': current, 'new': new_elo, 'delta': delta }
