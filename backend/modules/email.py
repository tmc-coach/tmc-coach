import os
from threading import Thread
from flask import render_template
from flask_mail import Message
from app import mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(
    app,
    kwargs,
):
    msg = Message(
        kwargs["subject"],
        sender=os.getenv("MAIL_SENDER"),
        recipients=[kwargs["to"]],
    )
    msg.body = render_template(kwargs["template"] + ".txt", **kwargs)

    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread
