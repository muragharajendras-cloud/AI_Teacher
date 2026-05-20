from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/metrics")
async def get_dashboard_metrics(current_user = Depends(get_current_user)):
    student_profile = current_user.student_profile
    if not student_profile:
        return {}
        
    return student_profile.cached_metrics or {}
