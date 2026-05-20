import os
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.security import get_current_user
from app.api.textbooks import router as textbooks_router
from app.api.websockets import router as websockets_router
from app.api.voice import router as voice_router
from app.api.behavior import router as behavior_router
from app.api.tests import router as tests_router
from app.api.dashboard import router as dashboard_router
from app.api.onboarding import router as onboarding_router

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="AI Tutor API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(textbooks_router)
app.include_router(websockets_router)
app.include_router(voice_router)
app.include_router(behavior_router)
app.include_router(tests_router)
app.include_router(dashboard_router)
app.include_router(onboarding_router)

allowed_origins = [
    "http://localhost:3000",
]
if os.environ.get("FRONTEND_URL"):
    allowed_origins.append(os.environ.get("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
@limiter.limit("60/minute")
async def health(request: Request):
    return {"status": "ok"}

@app.get("/api/me")
@limiter.limit("30/minute")
async def read_users_me(request: Request, current_user = Depends(get_current_user)):
    return {"user_id": current_user.id, "email": current_user.email}

@app.post("/auth/login")
@limiter.limit("5/minute")
async def mock_login_proxy(request: Request):
    # This is a proxy endpoint for rate limiting login attempts
    return {"status": "Use Supabase client-side auth"}
