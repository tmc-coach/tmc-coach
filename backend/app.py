import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

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

# set up database connection
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db: SQLAlchemy = SQLAlchemy(app)
app.app_context().push()

# import blueprints
from pages.auth import auth
from pages.courses import courses
from pages.main import main
from pages.org import org

# register blueprints
app.register_blueprint(main, url_prefix="/")
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(org, url_prefix="/org")
app.register_blueprint(courses, url_prefix="/courses")
