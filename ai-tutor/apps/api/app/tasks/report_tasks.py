from app.tasks.celery_app import celery_app
from app.core.database import SessionLocal
from app.models import StudentProfile
import os
import tempfile
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader

@celery_app.task
def generate_all_weekly_reports():
    db = SessionLocal()
    try:
        profiles = db.query(StudentProfile).filter(StudentProfile.onboarded == True).all()
        for profile in profiles:
            generate_and_send_report.delay(str(profile.id))
    except Exception as e:
        print("Error scheduling weekly reports:", e)
    finally:
        db.close()

@celery_app.task
def generate_and_send_report(student_id: str):
    db = SessionLocal()
    try:
        profile = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
        if not profile or not profile.cached_metrics:
            return
            
        metrics = profile.cached_metrics
        
        # MOCK PDF GENERATION AND EMAIL
        # In a real app, you would:
        # 1. Render Jinja2 template with metrics
        # env = Environment(loader=FileSystemLoader('app/templates'))
        # template = env.get_template('weekly_report.html')
        # html_out = template.render(name=profile.name, metrics=metrics)
        
        # 2. Convert to PDF
        # pdf_bytes = HTML(string=html_out).write_pdf()
        
        # 3. Upload to Supabase Storage
        # 4. Use resend.Emails.send() to email profile.parent.email
        
        print(f"Generated and sent weekly report for student {student_id}")
        
    except Exception as e:
        print(f"Error generating report for {student_id}: {str(e)}")
    finally:
        db.close()
