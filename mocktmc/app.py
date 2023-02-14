import os
from flask import Flask
from flask_cors import CORS
from pages.oauth import oauth


app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

app.register_blueprint(oauth, url_prefix="/oauth")
