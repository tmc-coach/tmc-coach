from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
import requests
from app.models import deadlines
from app import db
from sqlalchemy.sql import text
import json

deadline = Blueprint("deadline", __name__)


@deadline.route("/set_deadline", methods=["POST"])
def set_deadline():
    username = request.json.get("username")
    date = request.json.get("date")
    course_id = request.json.get("course_id")
    target = deadlines(username=username, course_id=course_id, date=date)
    db.session.add(target)
    # sql = "INSERT INTO deadlines (username, course_id, date) VALUES (:username, :course_id, :date)"
    # db.session.execute(text(sql), {"username":username, "course_id":course_id, "date":date})
    db.session.commit()
    return jsonify(message="Deadline added succesfully!")


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
