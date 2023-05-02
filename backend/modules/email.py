import os
from threading import Thread
from flask import render_template
from flask_mail import Message
from app import mail


def send_async_email(app, msg):
    """Send an email asynchronously

    Args:
        app (Flask): Flask app
        msg (Message): Message object

    Returns:
        None
    """

    with app.app_context():
        mail.send(msg)


def send_email(
    app,
    **kwargs,
):
    """Send an email

    Args:
        app (Flask): Flask app
        **kwargs: keyword arguments

    Returns:
        Thread object
    """
    
    msg = Message(
        kwargs["subject"],
        sender=os.getenv("MAIL_SENDER"),
        recipients=[kwargs["to"]],
    )
    msg.body = render_template(kwargs["template"] + ".txt", **kwargs)

    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread
