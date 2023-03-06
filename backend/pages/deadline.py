from flask import Blueprint, jsonify, request
from database_functions.set_deadline import set_deadline_function
from database_functions.get_deadlines import get_deadlines_function
from modules.user import get_user
from app import db

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

    message = set_deadline_function(username, date, course_id)
    print(message)
    return jsonify(message=message)

@deadline.route("/", methods=["GET"])
def get_deadlines():

    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    username = get_user(auth_header)
    if not username:
        return jsonify(error="Forbidden"), 403
    
    deadlines = get_deadlines_function(username)
    return deadlines
