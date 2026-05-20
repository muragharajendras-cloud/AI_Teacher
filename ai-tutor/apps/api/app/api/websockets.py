import json
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from app.services.teaching_engine import TeachingStateMachine
from app.core.security import get_current_user_ws

router = APIRouter(tags=["websockets"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections[session_id] = websocket

    def disconnect(self, session_id: str):
        if session_id in self.active_connections:
            del self.active_connections[session_id]

    async def send_message(self, message: dict, session_id: str):
        websocket = self.active_connections.get(session_id)
        if websocket:
            await websocket.send_json(message)

manager = ConnectionManager()

async def process_and_stream(engine: TeachingStateMachine, student_input: str, session_id: str, event_type: str = "student_text"):
    async for chunk in engine.process_turn(student_input, event_type):
        # We simply stream text back to the frontend.
        # The frontend will use the browser's native Web Speech API to synthesize this text,
        # completely removing the need for a backend TTS service like ElevenLabs.
        await manager.send_message({"type": "chunk", "text": chunk}, session_id)
        await asyncio.sleep(0.01)
        
    await manager.send_message({"type": "turn_end"}, session_id)
    
    # If session ended, close websocket
    if event_type == "end_session":
        websocket = manager.active_connections.get(session_id)
        if websocket:
            await websocket.close()

@router.websocket("/ws/session/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, token: str = Query(...)):
    # Authenticate handshake
    user = await get_current_user_ws(token)
    if not user:
        await websocket.close(code=1008, reason="Invalid authentication token")
        return

    await manager.connect(websocket, session_id)
    
    engine = TeachingStateMachine(
        session_id=session_id,
        student_id="student-123",
        student_name="Student",
        subject="Science",
        grade=10,
        topic="Photosynthesis"
    )
    
    try:
        if engine.turn_count == 0:
            await process_and_stream(engine, "", session_id)

        while True:
            data_str = await websocket.receive_text()
            try:
                data = json.loads(data_str)
            except:
                continue
                
            if data.get("type") == "ping":
                await manager.send_message({"type": "pong"}, session_id)
                continue
                
            if data.get("type") == "student_text":
                student_input = data.get("text", "")
                await process_and_stream(engine, student_input, session_id)
                
            elif data.get("type") == "silence_timeout":
                await process_and_stream(engine, "", session_id, "silence_timeout")
                
            elif data.get("type") == "end_session":
                await process_and_stream(engine, "", session_id, "end_session")
                
    except WebSocketDisconnect:
        manager.disconnect(session_id)
        engine.save_state()
