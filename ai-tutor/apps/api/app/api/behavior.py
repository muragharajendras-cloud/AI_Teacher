from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, BackgroundTasks
import tempfile
import os
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models import BehaviorIncident
from app.tasks.behavior_tasks import process_incident

router = APIRouter(prefix="/behavior", tags=["behavior"])

@router.post("/incident")
async def report_incident(
    session_id: str = Form(...),
    incident_type: str = Form(...), # 'gaze_away' or 'no_face'
    file: UploadFile = File(None),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = None
):
    student_profile = current_user.student_profile
    if not student_profile:
        student_id = str(current_user.id)
    else:
        student_id = str(student_profile.id)

    # 1. Create the DB record immediately without the photo URL
    incident = BehaviorIncident(
        session_id=session_id,
        student_id=student_id,
        type=incident_type
    )
    db.add(incident)
    db.commit()
    db.refresh(incident)

    tmp_path = None
    if file:
        # 2. Save image to temp file for Celery
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

    # 3. Fire background task
    background_tasks.add_task(
        process_incident,
        incident_id=str(incident.id),
        photo_path=tmp_path,
        student_id=student_id,
        incident_type=incident_type
    )

    return {"status": "logged", "incident_id": str(incident.id)}
