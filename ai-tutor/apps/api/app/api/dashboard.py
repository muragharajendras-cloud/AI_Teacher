from fastapi import APIRouter, Depends, BackgroundTasks
from app.core.security import get_current_user
from app.tasks.report_tasks import generate_all_weekly_reports

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/metrics")
async def get_dashboard_metrics(current_user = Depends(get_current_user)):
    student_profile = current_user.student_profile
    if not student_profile:
        return {}
        
    return student_profile.cached_metrics or {}

@router.post("/trigger-reports")
async def trigger_reports(background_tasks: BackgroundTasks):
    background_tasks.add_task(generate_all_weekly_reports)
    return {"status": "Weekly reports generation triggered in the background"}
