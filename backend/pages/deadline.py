from flask import Blueprint, jsonify, request
from database_functions.deadline_functions import set_deadline_function
from database_functions.deadline_functions import get_deadlines_function
from modules.user import get_user
from app import db

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

    message = set_deadline_function(user["id"], date, course_id)
    return jsonify(message=message)

@deadline.route("/", methods=["GET"])
def get_deadlines():

    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403
    
    deadlines = get_deadlines_function(user["id"])
    return deadlines
