from fastapi import APIRouter, UploadFile, File, HTTPException
import tempfile
import os
from groq import Groq
from app.core.config import settings

router = APIRouter(prefix="/voice", tags=["voice"])

# Initialize Groq client
try:
    groq_client = Groq(api_key=settings.GROQ_API_KEY)
except Exception as e:
    print(f"Failed to initialize Groq client: {e}")
    groq_client = None

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Takes an uploaded audio file (WAV format from frontend VAD)
    and transcribes it using Groq's blazing fast Whisper Large V3 API.
    """
    if groq_client is None:
        raise HTTPException(status_code=500, detail="Speech-to-text model not loaded on server.")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name
            
        with open(tmp_path, "rb") as audio_file:
            transcription = groq_client.audio.transcriptions.create(
                file=(tmp_path, audio_file.read()),
                model="whisper-large-v3",
            )
            
        os.remove(tmp_path)
        return {"text": transcription.text.strip()}
        
    except Exception as e:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))
