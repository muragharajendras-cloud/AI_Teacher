import json
from sentence_transformers import SentenceTransformer, util
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage
from app.core.config import settings

# Load model globally to avoid reloading on every grading request
model = SentenceTransformer('all-MiniLM-L6-v2')
llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY)
# Note: Groq gemma2 model might not support strict JSON mode natively depending on inference endpoint,
# but we prompt it for JSON output.

def grade_exact(answer: str, correct: str) -> float:
    """Tier 1: Exact Match (MCQ, Fill in blank)"""
    return 1.0 if answer.strip().upper() == correct.strip().upper() else 0.0

def grade_short(student: str, model_ans: str, key_terms: list, marks: int) -> float:
    """Tier 2: Semantic Similarity + Key Terms Coverage"""
    sim = float(util.cos_sim(
        model.encode(student), model.encode(model_ans)
    ))
    
    term_hits = sum(1 for t in key_terms if t.lower() in student.lower())
    term_score = term_hits / max(len(key_terms), 1)
    
    # Weighted: 60% semantic similarity, 40% key term coverage
    composite = 0.6 * sim + 0.4 * term_score
    
    if composite > 0.80: return float(marks)
    if composite > 0.60: return marks * 0.75
    if composite > 0.40: return marks * 0.5
    return 0.0

async def grade_descriptive(student: str, rubric: str, marks: int) -> dict:
    """Tier 3: LLM Rubric Grading"""
    prompt = f'''
    Grade this answer. Return JSON: {{"score": float, "feedback": "str"}}
    Marks available: {marks}
    Rubric: {rubric}
    Student answer: {student}
    
    Ensure the feedback is constructive and explains why points were awarded or deducted based on the rubric.
    '''
    response = await llm.ainvoke([HumanMessage(content=prompt)])
    try:
        data = json.loads(response.content)
        return {
            "score": float(data.get("score", 0.0)),
            "feedback": data.get("feedback", "No feedback provided.")
        }
    except Exception as e:
        print("Descriptive Grading JSON Parse Error:", e)
        return {"score": 0.0, "feedback": "Error evaluating response."}
