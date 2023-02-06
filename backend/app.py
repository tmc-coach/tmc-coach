import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pages.auth import auth
from pages.main import main
from pages.org import org

# configure environment variables
load_dotenv()
dirname = os.path.dirname(__file__)

try:
    load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
except FileNotFoundError:
    pass

app = Flask(__name__)
CORS(app)

# set secret key
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# register blueprints
app.register_blueprint(main, url_prefix="/")
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(org, url_prefix="/org")
