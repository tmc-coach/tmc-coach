import os
from flask import current_app, render_template
from flask_mail import Mail, Message


app = current_app

# configure e-mail settings
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")


mail = Mail(app)


def send_email(to, subject, on_schedule, course_name, checkpoint_percent,
               current_points, target_points, course_deadline):
    if on_schedule:
        template = "on_schedule"
    else:
        template = "falling_behind"
    msg = Message(
        subject,
        sender=os.getenv("MAIL_SENDER"),
        recipients=[to],
    )
    msg.body = render_template(template + ".txt", **kwargs)
    # msg.html = render_template(template + ".html", **kwargs)
    mail.send(msg)
