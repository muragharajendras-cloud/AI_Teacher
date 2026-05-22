from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn
from typing import Any, Dict, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Tutor API"
    VERSION: str = "1.0.0"

    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str
    SUPABASE_ANON_KEY: str

    DATABASE_URL: str

    GROQ_API_KEY: str
    RESEND_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
