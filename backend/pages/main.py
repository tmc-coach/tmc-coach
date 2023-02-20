from flask import Blueprint, jsonify
from app import db

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


# Database model demo
class TargetDate(db.Model):
    __tablename__ = "target_date"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"target_date('{self.date}')"
