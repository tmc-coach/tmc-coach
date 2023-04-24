import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail


db = SQLAlchemy()
mail = Mail()


def create_app():
    # create Flask app instance
    app = Flask(__name__)

    # configure environment variables
    load_dotenv()
    dirname = os.path.dirname(__file__)

    try:
        load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
    except FileNotFoundError:
        pass

    # set secret key
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

    # configure e-mail settings
    app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
    app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
    app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
    mail.init_app(app)

    # set up database connection
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    db.init_app(app)

    # enable CORS
    CORS(app)

    # import and register blueprints
    register_blueprints(app)

    return app


def register_blueprints(app):
    # pylint: disable=wrong-import-position
    # import and register blueprints
    from pages.auth import auth
    from pages.courses import courses
    from pages.main import main
    from pages.org import org
    from pages.deadline import deadline

    # pylint: enable=wrong-import-position

    app.register_blueprint(main, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(org, url_prefix="/org")
    app.register_blueprint(courses, url_prefix="/courses")
    app.register_blueprint(deadline, url_prefix="/deadline")
