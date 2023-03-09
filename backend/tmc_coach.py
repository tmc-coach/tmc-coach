from flask_migrate import Migrate, upgrade
from app import create_app, db
from app.models import deadlines

app = create_app()
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return {"deadlines": deadlines}


if __name__ == "__main__":
    app.run(debug=True)
