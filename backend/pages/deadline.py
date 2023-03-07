from flask import Blueprint, jsonify, request
from modules.user import get_user
import requests
from app import db
from sqlalchemy.sql import text
import json

deadline = Blueprint("deadline", __name__)

@deadline.route("/", methods=["POST"])
def set_deadline():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403


    date = request.json.get("date")
    course_id = request.json.get("course_id")
    
    if not date or not course_id:
        return jsonify(message="Missing fields"), 400
    
    target = deadlines(user_id=user["id"], course_id=course_id, date=date)
    db.session.add(target)
    db.session.commit()
    return jsonify(message="Deadline added succesfully!")

@deadline.route("/", methods=["GET"])
def get_all_deadlines():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    sql = "SELECT * FROM deadlines WHERE user_id=:user_id ORDER BY id DESC"
    result = db.session.execute(text(sql), {"user_id": user["id"]})
    deadlines = result.fetchall()
    response = {}
    for i in range(len(deadlines)):
        response[i] = {"id": deadlines[i][0], "username": deadlines[i][1], "course_id": deadlines[i][2], "date": deadlines[i][3]}
    return json.dumps(response, default=str)

@deadline.route("/<course_id>", methods=["GET"])
def get_deadline(course_id):

    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id ORDER BY id DESC LIMIT 1"
    result = db.session.execute(text(sql), {"user_id": user["id"], "course_id": course_id})
    deadline = result.fetchone()
    
    response = {
        "id": deadline[0],
        "user_id": deadline[1],
        "course_id": deadline[2],
        "date": deadline[3]
        }
    return json.dumps(response, default=str)

# Database model demo
class deadlines(db.Model):
    __tablename__ = 'deadlines'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"