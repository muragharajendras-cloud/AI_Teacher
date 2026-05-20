from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import settings

security = HTTPBearer()

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    supabase = get_supabase_client()
    try:
        response = supabase.auth.get_user(credentials.credentials)
        user = response.user
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )

async def get_current_user_ws(token: str):
    supabase = get_supabase_client()
    try:
        response = supabase.auth.get_user(token)
        return response.user
    except Exception:
        return None
