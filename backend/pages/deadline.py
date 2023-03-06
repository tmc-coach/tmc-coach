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

    username = get_user(auth_header)

    if not username:
        return jsonify(error="Forbidden"), 403


    date = request.json.get("date")
    course_id = request.json.get("course_id")
    
    if not username or not date or not course_id:
        return jsonify(message="Missing fields"), 400
    
    
    target = deadlines(username=username, course_id=course_id, date=date)
    db.session.add(target)
    #sql = "INSERT INTO deadlines (username, course_id, date) VALUES (:username, :course_id, :date)"
    #db.session.execute(text(sql), {"username":username, "course_id":course_id, "date":date})
    db.session.commit()
    return jsonify(message="Deadline added succesfully!")

@deadline.route("/", methods=["GET"])
def get_deadlines():

    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    username = get_user(auth_header)

    if not username:
        return jsonify(error="Forbidden"), 403

    course_id = request.headers.get("Courseid")

    sql = "SELECT * FROM deadlines WHERE username=:username AND course_id=:course_id ORDER BY id DESC LIMIT 1"
    result = db.session.execute(text(sql), {"username":username, "course_id":course_id})
    deadlines = result.fetchall() 
    response = {"deadlines": deadlines}
    response = {}
    for i in range(len(deadlines)):
        response[i] = {"id": deadlines[i][0], "username": deadlines[i][1], "course_id": deadlines[i][2], "date": deadlines[i][3]}
    return json.dumps(response, default=str)

# Database model demo
class deadlines(db.Model):
    __tablename__ = 'deadlines'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"