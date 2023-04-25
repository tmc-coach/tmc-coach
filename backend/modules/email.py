import os
from threading import Thread
from flask import render_template
from flask_mail import Message
from app import mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_checkpoint_email(
    app,
    to,
    on_schedule,
    course_name,
    checkpoint_percent,
    current_points,
    target_points,
    course_deadline,
):

    if on_schedule:
        template = "on_schedule"
        subject = f"{course_name} Checkpoint Update: You're on track!"
    else:
        template = "falling_behind"
        subject = f"{course_name} Checkpoint Update: Let's get back on track!"
    msg = Message(
        subject,
        sender=os.getenv("MAIL_SENDER"),
        recipients=[to],
    )
    msg.body = render_template(
        template + ".txt",
        Course_Name=course_name,
        Checkpoint_Percentage=checkpoint_percent,
        Completed_Points=current_points,
        Expected_Points=target_points,
        Course_Deadline=course_deadline,
    )
    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread

def send_deadline_email(
    app,
    to,
    finished,
    course_name,
    current_points,
    target_points,
    course_deadline
):
    
    if finished:
        template = "finished"
        subject = f"{course_name} Deadline day: You have finished the course!"
    else:
        template = "not_finished"
        subject = f"{course_name} Deadline day: Let's get back on track!"
    msg = Message(
        subject,
        sender=os.getenv("MAIL_SENDER"),
        recipients=[to],
    )
    msg.body = render_template(
        template + ".txt",
        Course_Name=course_name,
        Completed_Points=current_points,
        Expected_Points=target_points,
        Course_Deadline=course_deadline,
    )
    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread
