import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()


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

    # set up database connection
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    db.init_app(app)
    migrate = Migrate(app, db)

    # enable CORS
    CORS(app)

    # pylint: disable=wrong-import-position
    # import and register blueprints
    from pages.auth import auth
    from pages.courses import courses
    from pages.main import main
    from pages.org import org
    from pages.course import course
    from pages.deadline import deadline

    # pylint: enable=wrong-import-position

    app.register_blueprint(main, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(org, url_prefix="/org")
    app.register_blueprint(courses, url_prefix="/courses")
    app.register_blueprint(course, url_prefix="/course")
    app.register_blueprint(deadline, url_prefix="/deadline")

    # import models and register with db
    from app.models import User

    with app.app_context():
        db.create_all()

    return app
