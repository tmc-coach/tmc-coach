import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import logging


db = SQLAlchemy()


def create_app():
    # create Flask app instance
    app = Flask(__name__)

    logging.basicConfig(filename='logs/backend.log', level=logging.WARNING, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

    # configure environment variables
    load_dotenv()
    dirname = os.path.dirname(__file__)

    try:
        load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
    except FileNotFoundError:
        pass

    # set secret key
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

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
