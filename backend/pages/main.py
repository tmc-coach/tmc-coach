from flask import Blueprint, jsonify
from app import db
from app.models import TargetDate

main = Blueprint("main", __name__)


@main.route("/")
def hello_world():
    return jsonify(message="Hello TMC Coach!")


@main.route("/techdemo")
def techdemo():
    return jsonify(link="https://www.youtube.com/watch?v=dQw4w9WgXcQ")


# Database demo
@main.route("/dbdemo")
def dbdemo():
    target = TargetDate(username="Arnold", course="Judgment Day", date="2016-08-29")
    db.session.add(target)
    db.session.commit()
    return jsonify(message="Database demo successful!")
