import os
from app.tasks.celery_app import celery_app
from app.core.database import SessionLocal
from app.models import BehaviorIncident
from datetime import datetime
import uuid

@celery_app.task
def process_incident(incident_id: str, photo_path: str, student_id: str, incident_type: str):
    """
    Celery task to handle the heavy lifting of incident processing:
    1. Upload photo to S3 (mocked here, but structure is ready)
    2. Update DB with photo URL
    3. Send SendGrid email (mocked here)
    """
    db = SessionLocal()
    try:
        photo_url = None
        if photo_path and os.path.exists(photo_path):
            # MOCK S3 UPLOAD
            # In production:
            # s3 = boto3.client('s3')
            # object_name = f"incidents/{student_id}/{uuid.uuid4()}.jpg"
            # s3.upload_file(photo_path, 'my-bucket', object_name, ExtraArgs={'ServerSideEncryption': 'AES256'})
            # photo_url = s3.generate_presigned_url('get_object', Params={'Bucket': 'my-bucket', 'Key': object_name}, ExpiresIn=3600)
            
            photo_url = f"https://mock-s3-bucket.s3.amazonaws.com/incidents/{student_id}/{uuid.uuid4()}.jpg"
            
            # Clean up temp file
            os.remove(photo_path)
            
        incident = db.query(BehaviorIncident).filter(BehaviorIncident.id == incident_id).first()
        if incident:
            if photo_url:
                incident.photo_url = photo_url
                
            # MOCK SENDGRID EMAIL
            # In production:
            # message = Mail(from_email='alerts@aitutor.com', to_emails='parent@example.com', subject=f'Behavior Alert: {incident_type}')
            # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            # sg.send(message)
            
            incident.notified_at = datetime.utcnow()
            db.commit()
            
            return {"status": "processed", "incident_id": incident_id, "photo_url": photo_url}
    except Exception as e:
        print(f"Error processing incident {incident_id}: {str(e)}")
        raise e
    finally:
        db.close()
