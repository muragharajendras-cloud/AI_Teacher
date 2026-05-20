import json
from enum import Enum
from pydantic import BaseModel
from typing import AsyncGenerator
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from app.services.retrieval_service import retrieve_context
from app.core.config import settings
import redis

redis_client = redis.Redis.from_url(str(settings.REDIS_URL))

class SessionState(str, Enum):
    GREET = "GREET"
    EXPLAIN = "EXPLAIN"
    QUESTION = "QUESTION"
    WAIT = "WAIT"
    EVALUATE = "EVALUATE"
    PRAISE = "PRAISE"
    SIMPLIFY = "SIMPLIFY"
    RETEACH = "RETEACH"
    DOUBT = "DOUBT"
    SUMMARY = "SUMMARY"

TEACHER_SYSTEM_PROMPT = '''
You are {student_name}'s personal AI teacher for {subject}, Grade {grade}.
You are warm, patient, encouraging, and deeply knowledgeable.

═══ ABSOLUTE RULES (never break these) ═══
1. Answer ONLY from the TEXTBOOK CONTEXT provided below.
   If something is not in the context, say 'Let me check our textbook'
   and look for it — never use outside knowledge.
2. NEVER give the full answer before the student tries.
   Guide with hints. Wait for their attempt first.
3. After every 2-3 sentences of explanation, STOP and ask ONE question.
4. Match language to the student. If they write Hindi, respond in Hindi.
   Keep technical terms in English even in Hindi responses.
5. Respond in 100 words or fewer per turn. Be concise.

═══ CURRENT CONTEXT ═══
State: {state} | Topic: {topic} | Difficulty: {difficulty}
Wrong streak: {wrong_streak} | Session turns: {turn_count}

═══ TEXTBOOK CONTENT (use ONLY this) ═══
{context}

═══ CONVERSATION SO FAR ═══
{history}

Student just said: '{student_input}'
Respond now as the teacher:'''

class TeachingStateMachine:
    def __init__(self, session_id: str, student_id: str, student_name: str, subject: str, grade: int, topic: str):
        self.session_id = session_id
        self.student_id = student_id
        self.student_name = student_name
        self.subject = subject
        self.grade = grade
        self.topic = topic
        self.llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY, streaming=True)
        self.eval_llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY)
        self.load_state()

    def get_redis_key(self):
        return f"session_state:{self.session_id}"

    def load_state(self):
        data = redis_client.get(self.get_redis_key())
        if data:
            state_data = json.loads(data)
            self.state = SessionState(state_data.get('state', SessionState.GREET))
            self.difficulty = state_data.get('difficulty', 1000)
            self.wrong_streak = state_data.get('wrong_streak', 0)
            self.turn_count = state_data.get('turn_count', 0)
            self.history = state_data.get('history', [])
        else:
            self.state = SessionState.GREET
            self.difficulty = 1000
            self.wrong_streak = 0
            self.turn_count = 0
            self.history = []
            self.save_state()

    def save_state(self):
        state_data = {
            'state': self.state.value,
            'difficulty': self.difficulty,
            'wrong_streak': self.wrong_streak,
            'turn_count': self.turn_count,
            'history': self.history[-10:] # keep last 10 turns to save context length
        }
        redis_client.set(self.get_redis_key(), json.dumps(state_data), ex=86400) # 24 hours

    def format_history(self):
        return "\n".join([f"{msg['role'].capitalize()}: {msg['content']}" for msg in self.history])

    def evaluate_response(self, student_input: str, context: str) -> str:
        # Fast evaluation using gpt-4o-mini
        eval_prompt = f"""
        Evaluate the student's response based on the context.
        Context: {context}
        Student: {student_input}
        
        Return exactly one word: CORRECT, PARTIAL, or WRONG.
        """
        response = self.eval_llm.invoke([HumanMessage(content=eval_prompt)])
        result = response.content.strip().upper()
        if "CORRECT" in result: return "CORRECT"
        if "PARTIAL" in result: return "PARTIAL"
        return "WRONG"

    def is_question(self, text: str) -> bool:
        question_words = ['what', 'why', 'how', 'when', 'where', 'who', 'explain', '?']
        return any(w in text.lower() for w in question_words)

    async def process_turn(self, student_input: str, event_type: str = "student_text") -> AsyncGenerator[str, None]:
        self.turn_count += 1
        
        # Determine next state
        context = retrieve_context(student_input if student_input else self.topic, self.student_id, self.subject)
        
        if event_type == "silence_timeout":
            self.state = SessionState.WAIT
        elif event_type == "end_session":
            self.state = SessionState.SUMMARY
        elif self.is_question(student_input):
            self.state = SessionState.DOUBT
        elif self.state in [SessionState.QUESTION, SessionState.WAIT]:
            score = self.evaluate_response(student_input, context)
            if score == "CORRECT":
                self.state = SessionState.PRAISE
                self.wrong_streak = 0
                self.difficulty += 5
            elif score == "PARTIAL":
                self.state = SessionState.SIMPLIFY
                self.wrong_streak = 0
            else:
                self.wrong_streak += 1
                if self.wrong_streak >= 2:
                    self.state = SessionState.RETEACH
                    self.difficulty -= 15
                    self.wrong_streak = 0
                else:
                    self.state = SessionState.SIMPLIFY
        else:
            if self.turn_count == 1:
                self.state = SessionState.GREET
            else:
                self.state = SessionState.EXPLAIN

        system_message = TEACHER_SYSTEM_PROMPT.format(
            student_name=self.student_name,
            subject=self.subject,
            grade=self.grade,
            state=self.state.value,
            topic=self.topic,
            difficulty=self.difficulty,
            wrong_streak=self.wrong_streak,
            turn_count=self.turn_count,
            context=context,
            history=self.format_history(),
            student_input=student_input
        )

        full_response = ""
        async for chunk in self.llm.astream([SystemMessage(content=system_message)]):
            if chunk.content:
                full_response += chunk.content
                yield chunk.content
                
        # State transitions for next turn based on what AI just did
        if self.state in [SessionState.PRAISE, SessionState.EXPLAIN, SessionState.RETEACH, SessionState.SIMPLIFY]:
            self.state = SessionState.QUESTION
            
        self.history.append({"role": "student", "content": student_input})
        self.history.append({"role": "teacher", "content": full_response})
        self.save_state()
