from flask import Blueprint, jsonify, request
from database_functions.set_deadline import set_deadline_function
from database_functions.get_deadlines import get_deadlines_function

deadline = Blueprint("deadline", __name__)

@deadline.route("/set_deadline", methods=["POST"])
def set_deadline():
    username = request.json.get("username")
    date = request.json.get("date")
    course_id = request.json.get("course_id")
    message = set_deadline_function(username, date, course_id)
    print(message)
    return jsonify(message=message)

@deadline.route("/<username>", methods=["GET"])
def get_deadlines(username):
    deadlines = get_deadlines_function(username)
    return deadlines
