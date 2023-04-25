import os
from threading import Thread
from flask import render_template
from flask_mail import Message
from app import mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def create_msg(template, subject, to, **kwargs):
    msg = Message(
        subject,
        sender=os.getenv("MAIL_SENDER"),
        recipients=[to],
    )
    msg.body = render_template(template + ".txt", **kwargs)
    return msg

def send_checkpoint_email(
    app,
    to,
    template,
    course_name,
    checkpoint_percent,
    current_points,
    target_points,
    course_deadline,
    subject,
):

    msg = create_msg(
        template=template,
        subject=subject,
        to=to,
        Course_Name=course_name,
        Checkpoint_Percent=checkpoint_percent,
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
    template,
    course_name,
    current_points,
    target_points,
    course_deadline,
    subject,
):   

    msg = create_msg(
        template=template,
        subject=subject,
        to=to,
        Course_Name=course_name,
        Completed_Points=current_points,
        Expected_Points=target_points,
        Course_Deadline=course_deadline,
    )

    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread
