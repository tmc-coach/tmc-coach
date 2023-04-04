import os
from flask import render_template
from flask_mail import Mail, Message


def send_email(app, to, on_schedule, course_name,
               checkpoint_percent, current_points,
               target_points, course_deadline):
    with app.app_context():
        # configure e-mail settings
        app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
        app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
        app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
        app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
        app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")


        mail = Mail(app)

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
        msg.body = render_template(template + ".txt", Course_Name=course_name,
                                   Checkpoint_Percentage=checkpoint_percent,
                                   Completed_Points=current_points,
                                   Expected_Points=target_points,
                                   Course_Deadline=course_deadline)
        mail.send(msg)
