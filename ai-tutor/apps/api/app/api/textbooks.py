from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status, BackgroundTasks
import tempfile
import os
from sqlalchemy.orm import Session
from app.tasks.indexing_tasks import index_textbook
from app.core.database import get_db
from app.core.security import get_current_user
from app.models import Textbook

router = APIRouter(prefix="/textbooks", tags=["textbooks"])

@router.post("/upload")
async def upload_textbook(
    subject: str,
    grade: int = None,
    board: str = None,
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = None
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    # We assume current_user has a student_profile, or they ARE the student_profile.
    # The roadmap creates student_profiles 1:1 with users.
    # For simplicity, we use current_user.id as a proxy to fetch the student_profile
    # Let's assume current_user.student_profile is accessible or we just use user id
    student_profile = current_user.student_profile
    if not student_profile:
        # For testing, if no profile, we can use the user_id as student_id if that's the setup
        student_id = str(current_user.id)
    else:
        student_id = str(student_profile.id)

    # 1. Save an initial record in DB
    new_textbook = Textbook(
        student_id=student_id,
        subject=subject,
        grade=grade,
        board=board,
        status='uploading',
        chunk_count=0
    )
    db.add(new_textbook)
    db.commit()
    db.refresh(new_textbook)
    
    # 2. Save to temp file
    with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
        
    # Update status to indexing
    new_textbook.status = 'indexing'
    db.commit()

    # 3. Fire background indexing task
    background_tasks.add_task(
        index_textbook,
        pdf_path=tmp_path,
        student_id=student_id,
        subject=subject,
        textbook_id=str(new_textbook.id)
    )
    
    return {"textbook_id": str(new_textbook.id), "status": "indexing"}
