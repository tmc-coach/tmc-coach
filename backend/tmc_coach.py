from flask_migrate import Migrate
from app import create_app, db
from modules.jobs import schedule


def start_app():
    application = create_app()
    Migrate(application, db)
    schedule(application)
    return application


if __name__ == "__main__":
    app = start_app()
    app.run(debug=True)
