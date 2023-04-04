from app.models import checkpoints
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from database_functions.checkpoint_functions import get_checkpoint_infos
from modules.email import send_email
import requests

def schedule(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(do_stuff, "cron", hour=4, minute=20)
    # scheduler.add_job(do_stuff, "interval", seconds=10)
    scheduler.add_job(
        get_checkpoints_for_today, "cron", hour=13, minute=37, args=(app,)
    )
    scheduler.add_job(send_checkpoint_emails, "interval", minutes=5)
    scheduler.start()


def do_stuff():
    print("Never gonna give you up")
    print("Never gonna let you down")
    print("Never gonna run around and desert you")
    print("Never gonna make you cry")
    print("Never gonna say goodbye")
    print("Never gonna tell a lie and hurt you")


def get_checkpoints_for_today(app):
    with app.app_context():
        today = datetime.now().date()
        current_checkpoints = checkpoints.query.filter_by(checkpoint_date=today).all()
        print("Hello checkpoints!")
        for user_id, checkpoint_percent in current_checkpoints:
            # Coach those champions to triumph!
            # I mean, send e-mail and stuff if necessary
            pass

def send_checkpoint_emails():
    # current_date = datetime.now().date()
    current_date = "2023-04-04"
    results = get_checkpoint_infos(current_date)
    # print("sähköpostia varten:")
    for result in results: 
        user_id = result[2]
        token = result[1]
        target_points = result[4]
        course_id = result[5]
        email = result[0]
        checkpoint_percent = result[3]
        deadline = result[6]
        current_points = len(current_points_from_api(course_id, user_id))
        course_name = course_name_from_api(course_id, token)
        on_schedule = True
        if current_points < target_points:
            on_schedule = False
        send_email(to=email,
                   on_schedule=on_schedule,
                   Course_Name=course_name,
                   Checkpoint_Percentage=checkpoint_percent,
                   Completed_Points=current_points,
                   Expected_Points=target_points,
                   Course_Deadline=deadline)
        # print({"email": email, "course_name": course_name, "checkpoint_percent": checkpoint_percent,
        #        "current_points": current_points, "target_points": target_points,
        #        "course_deadline": deadline, "on_schedule": on_schedule})

#api calls that are needed for sending email
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
