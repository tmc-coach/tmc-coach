from flask_migrate import Migrate, upgrade
from app import create_app, db
from app.models import deadlines, TargetDate


app = create_app()
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return {"db": db, "deadlines": deadlines, "TargetDate": TargetDate}


if __name__ == "__main__":
    app.run(debug=True)
