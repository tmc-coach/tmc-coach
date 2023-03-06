from flask import Blueprint, jsonify, request
from modules.user import get_user
import requests
from app.models import deadlines
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
    
    target = deadlines(course_id=course_id, date=date)
    db.session.add(target)
    # sql = "INSERT INTO deadlines (username, course_id, date) VALUES (:username, :course_id, :date)"
    # db.session.execute(text(sql), {"username":username, "course_id":course_id, "date":date})
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
    

@deadline.route("/<username>", methods=["GET"])
def get_deadlines(username):
    sql = "SELECT * FROM deadlines WHERE username=:username"
    result = db.session.execute(text(sql), {"username": username})
    deadlines = result.fetchall()
    response = {"deadlines": deadlines}
    response = {}
    for i in range(len(deadlines)):
        response[i] = {
            "id": deadlines[i][0],
            "username": deadlines[i][1],
            "course_id": deadlines[i][2],
            "date": deadlines[i][3],
        }
    return json.dumps(response, default=str)
