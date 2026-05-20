from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import redis
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.core.config import settings
from app.services.test_generation_service import generate_test
from app.services.grading_service import grade_exact, grade_short, grade_descriptive
from app.services.elo_service import update_elo_from_test
from app.models import TestResult

router = APIRouter(prefix="/tests", tags=["tests"])
redis_client = redis.Redis.from_url(str(settings.REDIS_URL))

class GenerateTestRequest(BaseModel):
    subject: str
    chapter: str
    duration_minutes: int

class QuestionAnswer(BaseModel):
    question_index: int
    question_type: str # mcq, short_answer, descriptive
    answer: str

class SubmitTestRequest(BaseModel):
    subject: str
    chapter: str
    answers: List[QuestionAnswer]
    # To grade properly, we need the original test payload or questions
    original_test: Dict[str, Any] 

@router.post("/generate")
async def api_generate_test(req: GenerateTestRequest, current_user = Depends(get_current_user)):
    student_profile = current_user.student_profile
    student_id = str(student_profile.id) if student_profile else str(current_user.id)
    
    test_payload = await generate_test(student_id, req.subject, req.chapter)
    
    # Enforce server-side timer using Redis
    # Allow 1 extra minute for network latency
    redis_key = f"test_timer:{student_id}:{req.subject}:{req.chapter}"
    redis_client.set(redis_key, "active", ex=(req.duration_minutes + 1) * 60)
    
    return test_payload

@router.post("/submit")
async def api_submit_test(req: SubmitTestRequest, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    student_profile = current_user.student_profile
    student_id = str(student_profile.id) if student_profile else str(current_user.id)
    
    # 1. Timer Validation
    redis_key = f"test_timer:{student_id}:{req.subject}:{req.chapter}"
    is_active = redis_client.get(redis_key)
    
    if not is_active:
        raise HTTPException(status_code=403, detail="Test timer expired or test not started.")
        
    # Clear the timer so they can't submit twice
    redis_client.delete(redis_key)
    
    # 2. Grading
    total_score = 0.0
    total_max = 0.0
    graded_answers = []
    
    for ans in req.answers:
        q_type = ans.question_type
        idx = ans.question_index
        
        try:
            q_data = req.original_test["questions"][q_type][idx]
        except (KeyError, IndexError):
            continue # Invalid question reference
            
        score = 0.0
        feedback = ""
        max_marks = float(q_data.get("marks", 1.0)) # Default 1 for MCQ
        
        if q_type == "mcq":
            score = grade_exact(ans.answer, q_data.get("correct_answer", ""))
            feedback = "Correct" if score == 1.0 else f"Incorrect. Correct answer is {q_data.get('correct_answer')}"
        elif q_type == "short_answer":
            score = grade_short(
                ans.answer, 
                q_data.get("model_answer", ""), 
                q_data.get("key_terms", []), 
                int(max_marks)
            )
            feedback = f"Awarded {score}/{max_marks} marks based on semantic similarity and key terms."
        elif q_type == "descriptive":
            # await grade_descriptive since it's async
            result = await grade_descriptive(ans.answer, q_data.get("marking_rubric", ""), int(max_marks))
            score = result["score"]
            feedback = result["feedback"]
            
        total_score += score
        total_max += max_marks
        
        graded_answers.append({
            "question_type": q_type,
            "question": q_data.get("question", ""),
            "student_answer": ans.answer,
            "earned": score,
            "max": max_marks,
            "feedback": feedback
        })
        
    pct_score = total_score / total_max if total_max > 0 else 0
    
    # 3. Update ELO
    elo_result = update_elo_from_test(db, student_id, req.subject, req.chapter, pct_score)
    
    # 4. Save Test Result
    test_result = TestResult(
        student_id=student_id,
        subject=req.subject,
        chapter=req.chapter,
        score=total_score,
        max_score=total_max,
        answers=graded_answers
    )
    db.add(test_result)
    db.commit()
    db.refresh(test_result)
    
    return {
        "status": "graded",
        "result_id": str(test_result.id),
        "score": total_score,
        "max_score": total_max,
        "percentage": pct_score * 100,
        "elo_updates": elo_result,
        "details": graded_answers
    }
