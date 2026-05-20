from fastapi import APIRouter, UploadFile, File, HTTPException
import tempfile
import os
from faster_whisper import WhisperModel

router = APIRouter(prefix="/voice", tags=["voice"])

# Load WhisperModel globally to keep it in memory
# Using "tiny" or "base" to ensure low memory footprint for MVP
# compute_type="int8" reduces RAM usage significantly
try:
    model = WhisperModel("tiny", device="cpu", compute_type="int8")
except Exception as e:
    print(f"Failed to load Faster Whisper model: {e}")
    model = None

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Takes an uploaded audio file (WAV format from frontend VAD)
    and transcribes it locally using faster-whisper.
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Speech-to-text model not loaded on server.")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name
            
        segments, info = model.transcribe(tmp_path, beam_size=5)
        
        # Combine all segments into a single string
        transcription = " ".join([segment.text for segment in segments])
            
        os.remove(tmp_path)
        return {"text": transcription.strip()}
        
    except Exception as e:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))
