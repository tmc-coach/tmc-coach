from flask_migrate import Migrate, upgrade
from app import create_app, db
from app.models import deadlines
from modules.jobs import schedule


def start_app():
    app = create_app()
    Migrate(app, db)
    schedule(app)
    return app


if __name__ == "__main__":
    app = start_app()
    app.run(debug=True)
