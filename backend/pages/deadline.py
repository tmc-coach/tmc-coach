from flask import Blueprint, jsonify, request
from database_functions.deadline_functions import (
    set_deadline_function,
    get_deadlines_function,
    delete_deadline_permanently_function,
    get_deadline_function,
)
from modules.user import get_user
from modules.validate import validate_date, validate_id
from modules.user import decode_jwt
import requests


deadline = Blueprint("deadline", __name__)


@deadline.route("/", methods=["POST"])
def set_deadline():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    course_id = request.json.get("course_id")

    # check if course id is numeric
    if not validate_id(course_id):
        return jsonify(error="Invalid course id"), 400

    date = request.json.get("date")

    # Validate if date is in correct format and in future
    if not validate_date(date):
        return jsonify(error="Invalid date"), 400

    if not date or not course_id:
        return jsonify(message="Missing fields"), 400
    
    response_exercises = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/exercises",
        headers={"Accept": "application/json", "Authorization": user["token"]},
    )
    exercises = response_exercises.json()

    message = set_deadline_function(user["id"], date, course_id, exercises)

    return jsonify(message=message)


@deadline.route("/", methods=["GET"])
def get_all_deadlines():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    deadlines = get_deadlines_function(user["id"])
    return deadlines


@deadline.route("/<course_id>", methods=["GET", "DELETE"])
def get_or_delete_deadline(course_id):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    if request.method == "GET":
        deadline = get_deadline_function(user["id"], course_id)

        return deadline

    if request.method == "DELETE":
        if not course_id:
            return jsonify(message="Missing fields"), 400

        message = delete_deadline_permanently_function(user["id"], course_id)

        return jsonify(message=message)
