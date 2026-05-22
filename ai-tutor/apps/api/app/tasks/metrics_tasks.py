
from app.core.database import SessionLocal
from app.models import Session, TestResult, BehaviorIncident, StudentProfile
from datetime import datetime, timedelta
import json
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage
from app.core.config import settings

llm = ChatGroq(model="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY)

def get_ai_recommendations(tests: list) -> list:
    if not tests:
        return ["Take your first mock test to get personalized recommendations!"]
    
    # Simple prompt to generate insights based on recent tests
    test_summary = "\n".join([f"{t.subject} - {t.chapter}: {t.score}/{t.max_score}" for t in tests[:5]])
    prompt = f"""
    Based on the student's recent test scores, provide 3 short, actionable, and encouraging recommendations for their next study session.
    Format as a simple JSON array of strings: ["Tip 1", "Tip 2", "Tip 3"]
    
    Recent Tests:
    {test_summary}
    """
    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        data = json.loads(response.content)
        if isinstance(data, list):
            return data
        return data.get("recommendations", [])
    except:
        return ["Review your weak topics carefully.", "Practice more descriptive questions.", "Maintain a consistent study schedule."]

def recompute_student_metrics(student_id: str):
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        week_ago = now - timedelta(days=7)
        ninety_days_ago = now - timedelta(days=90)
        
        sessions = db.query(Session).filter(Session.student_id == student_id, Session.started_at >= ninety_days_ago).all()
        tests = db.query(TestResult).filter(TestResult.student_id == student_id).order_by(TestResult.taken_at.desc()).all()
        behavior = db.query(BehaviorIncident).filter(BehaviorIncident.student_id == student_id, BehaviorIncident.ts >= week_ago).all()
        profile = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
        
        if not profile:
            return
            
        study_hours_total = sum((s.duration_min or 0) for s in sessions) / 60.0
        
        sessions_week = [s for s in sessions if s.started_at and s.started_at >= week_ago]
        study_hours_week = sum((s.duration_min or 0) for s in sessions_week) / 60.0
        
        # Calculate subject averages and identify weak/strong topics
        subject_avg = {}
        chapter_scores = {}
        
        for t in tests:
            if t.max_score > 0:
                pct = t.score / t.max_score
                
                if t.subject not in subject_avg:
                    subject_avg[t.subject] = []
                subject_avg[t.subject].append(pct)
                
                key = f"{t.subject}.{t.chapter}"
                if key not in chapter_scores:
                    chapter_scores[key] = []
                chapter_scores[key].append(pct)
                
        # Average the subjects
        for subj in subject_avg:
            subject_avg[subj] = (sum(subject_avg[subj]) / len(subject_avg[subj])) * 100
            
        # Weak/Strong topics based on recent averages
        weak_topics = []
        strong_topics = []
        for chapter, scores in chapter_scores.items():
            avg_pct = sum(scores) / len(scores)
            if avg_pct < 0.50:
                weak_topics.append(chapter)
            elif avg_pct > 0.80:
                strong_topics.append(chapter)
                
        # Behavior score
        # Start at 100, deduct 5 for every gaze_away, 10 for every no_face
        behavior_score = 100
        for inc in behavior:
            if inc.type == "gaze_away":
                behavior_score -= 5
            elif inc.type == "no_face":
                behavior_score -= 10
        behavior_score = max(0, behavior_score)
        
        # Streak calculation (simplified)
        streak = 0
        if sessions_week:
            streak = 1 # Mock streak calculation for demo purposes
            
        # History for charts
        test_history = [
            {
                "subject": t.subject,
                "chapter": t.chapter,
                "score": t.score,
                "max_score": t.max_score,
                "date": t.taken_at.isoformat() if t.taken_at else None
            } for t in tests[:10]
        ]
        
        ai_recommendations = get_ai_recommendations(tests)
        
        metrics = {
            'streak': streak,
            'study_hours_total': round(study_hours_total, 1),
            'study_hours_week': round(study_hours_week, 1),
            'sessions_week': len(sessions_week),
            'subject_avg': subject_avg,
            'weak_topics': weak_topics,
            'strong_topics': strong_topics,
            'behavior_score': behavior_score,
            'elo_by_chapter': profile.elo_ratings or {},
            'test_history': test_history,
            'ai_recommendations': ai_recommendations,
            'updated_at': now.isoformat()
        }
        
        profile.cached_metrics = metrics
        db.commit()
        
    except Exception as e:
        print(f"Error computing metrics for {student_id}: {str(e)}")
        db.rollback()
    finally:
        db.close()
