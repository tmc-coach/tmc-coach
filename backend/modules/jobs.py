from app.models import checkpoints
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime


def schedule(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(do_stuff, "cron", hour=4, minute=20)
    scheduler.add_job(get_checkpoints_for_today, "cron", hour=13, minute=37, args=(app,))
    scheduler.start()


def do_stuff():
    print("Hello Scheduler!")


def get_checkpoints_for_today(app):
    with app.app_context():
        today = datetime.now().date()
        current_checkpoints = checkpoints.query.filter_by(checkpoint_date=today).all()
        print("Hello checkpoints!")
        for user_id, checkpoint_percent in current_checkpoints:
            # Coach those champions to triumph!
            # I mean, send e-mail and stuff if necessary
            pass
