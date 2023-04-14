from app.models import checkpoints
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from modules.checkpoint import get_checkpoint_infos
from modules.deadline import get_deadline_infos
from modules.email import send_checkpoint_email, send_deadline_email
import requests


def schedule(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(do_stuff, "cron", hour=4, minute=20)
    # scheduler.add_job(do_stuff, "interval", seconds=10)
    scheduler.add_job(send_checkpoint_emails, "cron", hour=10, minute=30, args=(app,))
    # scheduler.add_job(send_checkpoint_emails, "interval", seconds=10, args=(app,))
    scheduler.start()


def do_stuff():
    print("Never gonna give you up")
    print("Never gonna let you down")
    print("Never gonna run around and desert you")
    print("Never gonna make you cry")
    print("Never gonna say goodbye")
    print("Never gonna tell a lie and hurt you")

def send_deadline_emails(app):
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
            finished = True
            if current_points < target_points:
                finished = False
            send_deadline_email(
            app=app,
            to=email,
            on_schedule=finished,
            course_name=course_name,
            current_points=current_points,
            target_points=target_points,
            course_deadline=deadline_date,
            )

def send_checkpoint_emails(app):
    with app.app_context():
        current_date = datetime.now().date()
        results = get_checkpoint_infos(current_date)
        for result in results:
            user_id = result[2]
            token = result[1]
            target_points = result[4]
            course_id = result[5]
            email = result[0]
            checkpoint_percent = result[3]
            course_deadline = result[6]
            course_deadline = course_deadline.strftime("%d.%m.%Y")
            current_points = len(current_points_from_api(course_id, user_id))
            course_name = course_name_from_api(course_id, token)
            on_schedule = True
            if current_points < target_points:
                on_schedule = False
            send_checkpoint_email(
                app=app,
                to=email,
                on_schedule=on_schedule,
                course_name=course_name,
                checkpoint_percent=checkpoint_percent,
                current_points=current_points,
                target_points=target_points,
                course_deadline=course_deadline,
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
