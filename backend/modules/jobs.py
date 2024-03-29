from app.models import checkpoints
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from modules.checkpoint import get_checkpoint_infos
from modules.deadline import get_deadline_infos
from modules.email import send_email
import requests


def schedule(app):
    """Schedules the jobs. Apscheduler works in the background. In the future,
    changing Apscheduler to Celery would be recommended if scaling the application.

    Args:
        app: Flask app

    Returns:
        None
    """

    scheduler = BackgroundScheduler()
    scheduler.add_job(send_checkpoint_emails, "cron", hour=9, minute=0, args=(app,))
    scheduler.add_job(send_deadline_emails, "cron", hour=9, minute=0, args=(app,))
    # scheduler.add_job(send_deadline_emails, "interval", minutes=7, args=(app,))
    # scheduler.add_job(send_checkpoint_emails, "interval", minutes=5, args=(app,))
    scheduler.start()


def send_deadline_emails(app):
    """Sends deadline emails

    Args:
        app: Flask app

    Returns:
        None
    """

    with app.app_context():
        current_date = datetime.now().date()
        results = get_deadline_infos(current_date)
        for result in results:
            email = result[0]
            token = result[1]
            user_id = result[2]
            target_points = result[3]
            course_id = result[4]
            deadline_date = result[5]
            current_points = len(current_points_from_api(course_id, user_id))
            course_name = course_name_from_api(course_id, token)
            template = "finished"
            subject = f"{course_name} Deadline day: You have finished the course!"
            if current_points < target_points:
                template = "not_finished"
                subject = f"{course_name} Deadline day: Let's get back on track!"
            kwargs = {
                "to": email,
                "template": template,
                "Course_Name": course_name,
                "Completed_Points": current_points,
                "Expected_Points": target_points,
                "Course_Deadline": deadline_date,
                "subject": subject,
            }
            send_email(
                app=app,
                **kwargs,
            )


def send_checkpoint_emails(app):
    """Sends checkpoint emails

    Args:
        app: Flask app

    Returns:
        None
    """

    with app.app_context():
        current_date = datetime.now().date()
        results = get_checkpoint_infos(current_date)
        for result in results:
            email = result[0]
            token = result[1]
            user_id = result[2]
            checkpoint_percent = result[3]
            target_points = result[4]
            course_id = result[5]
            course_deadline = result[6]
            course_deadline = course_deadline.strftime("%d.%m.%Y")
            current_points = len(current_points_from_api(course_id, user_id))
            course_name = course_name_from_api(course_id, token)
            template = "on_schedule"
            subject = f"{course_name} Checkpoint Update: You're on track!"
            if current_points < target_points:
                template = "falling_behind"
                subject = f"{course_name} Checkpoint Update: Let's get back on track!"
            kwargs = {
                "to": email,
                "template": template,
                "Course_Name": course_name,
                "Checkpoint_Percent": checkpoint_percent,
                "Completed_Points": current_points,
                "Expected_Points": target_points,
                "Course_Deadline": course_deadline,
                "subject": subject,
            }
            send_email(
                app=app,
                **kwargs,
            )


# api calls that are needed for sending email
def current_points_from_api(course_id, user_id):
    points = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/users/{user_id}/points"
    )
    return points.json()


def course_name_from_api(course_id, token):
    course_info = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}",
        headers={"Accept": "application/json", "Authorization": token},
    )
    course_info = course_info.json()
    return course_info["title"]
