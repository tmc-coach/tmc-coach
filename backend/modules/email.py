import os
from flask import current_app
from flask_mail import Mail, Message


app = current_app

# configure e-mail settings
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")


mail = Mail(app)


def send_email(to, subject, template):
    sender = os.getenv("MAIL_SENDER")
    msg = Message(subject, sender=sender, recipients=[to])
    msg.body = template
    mail.send(msg)
