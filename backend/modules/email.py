import os
from flask import current_app
from flask_mail import Mail

app = current_app

# configure e-mail settings
# if you want to use gmail, set MAIL_USE_TLS to True and MAIL_PORT to 587
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = 25
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')


mail = Mail(app)
