from celery import Celery
from app.core.config import settings
from celery.schedules import crontab

celery_app = Celery(
    "worker",
    broker=str(settings.REDIS_URL),
    backend=str(settings.REDIS_URL),
    include=["app.tasks.indexing_tasks", "app.tasks.behavior_tasks", "app.tasks.metrics_tasks", "app.tasks.report_tasks"]
)

celery_app.conf.task_routes = {
    "app.tasks.indexing_tasks.*": {"queue": "indexing"},
    "app.tasks.behavior_tasks.*": {"queue": "behavior"},
    "app.tasks.metrics_tasks.*": {"queue": "metrics"},
    "app.tasks.report_tasks.*": {"queue": "reports"}
}

celery_app.conf.beat_schedule = {
    'weekly-reports': {
        'task': 'app.tasks.report_tasks.generate_all_weekly_reports',
        'schedule': crontab(hour=8, minute=0, day_of_week=0),
    }
}
