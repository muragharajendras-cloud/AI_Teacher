import asyncio
import json
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from app.services.retrieval_service import retrieve_context
from app.core.config import settings

# Note: temperature affects Groq differently, keeping it low for JSON stability.
mcq_llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY, temperature=0.2)
short_llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY, temperature=0.3)
desc_llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY, temperature=0.5)

async def generate_mcq(context: str, count: int = 5) -> list:
    prompt = f"""
    Generate {count} multiple choice questions based on the following context.
    Return JSON format: {{"questions": [{{"question": "...", "options": ["A", "B", "C", "D"], "correct_answer": "A", "distractor_rationale": "..."}}]}}
    IMPORTANT: Provide 4 options. Make sure exactly one option is the correct answer. Provide one plausible distractor and two clearly wrong ones.
    
    Context:
    {context}
    """
    response = await mcq_llm.ainvoke([HumanMessage(content=prompt)])
    try:
        return json.loads(response.content).get("questions", [])
    except Exception as e:
        print("MCQ JSON Parse Error:", e)
        return []

async def generate_short_answer(context: str, count: int = 3) -> list:
    prompt = f"""
    Generate {count} short answer questions based on the following context.
    Return JSON format: {{"questions": [{{"question": "...", "model_answer": "...", "key_terms": ["term1", "term2"], "marks": 2}}]}}
    IMPORTANT: The model_answer should be 2-3 sentences. Identify 2-4 critical key_terms for semantic grading. Assign 2-3 marks per question.
    
    Context:
    {context}
    """
    response = await short_llm.ainvoke([HumanMessage(content=prompt)])
    try:
        return json.loads(response.content).get("questions", [])
    except Exception as e:
        print("Short Answer JSON Parse Error:", e)
        return []

async def generate_descriptive(context: str, count: int = 2) -> list:
    prompt = f"""
    Generate {count} descriptive (long answer) questions based on the following context.
    Return JSON format: {{"questions": [{{"question": "...", "marking_rubric": "...", "marks": 5}}]}}
    IMPORTANT: The question should be open-ended requiring a detailed response. Provide a detailed marking_rubric with 3-4 criteria and points each (e.g., '2 points for X, 2 points for Y, 1 point for Z').
    
    Context:
    {context}
    """
    response = await desc_llm.ainvoke([HumanMessage(content=prompt)])
    try:
        return json.loads(response.content).get("questions", [])
    except Exception as e:
        print("Descriptive JSON Parse Error:", e)
        return []

async def generate_test(student_id: str, subject: str, chapter: str) -> dict:
    # 1. Retrieve context for the specific chapter
    # In a real app, retrieve_context would pull all chunks for this chapter
    context = retrieve_context(f"all content for chapter: {chapter}", student_id, subject)
    
    # 2. Parallel LLM generation
    mcq_task = generate_mcq(context, count=5)
    short_task = generate_short_answer(context, count=3)
    desc_task = generate_descriptive(context, count=2)
    
    mcq_qs, short_qs, desc_qs = await asyncio.gather(mcq_task, short_task, desc_task)
    
    return {
        "subject": subject,
        "chapter": chapter,
        "questions": {
            "mcq": mcq_qs,
            "short_answer": short_qs,
            "descriptive": desc_qs
        }
    }
