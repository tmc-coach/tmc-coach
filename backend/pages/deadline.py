from flask import Blueprint, jsonify, request
from sqlalchemy import text
from modules.deadline import (
    set_deadline,
    delete_deadline,
    get_course_deadline,
)

from modules.checkpoint import (
    get_checkpoints,
)

from modules.user import get_user
from modules.validate import validate_date, validate_id
import requests
import json
from datetime import timedelta
import datetime

deadline = Blueprint("deadline", __name__)


@deadline.route("/", methods=["POST"])
def set_deadline_route():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    course_id = request.json.get("course_id")
    checkpoints = request.json.get("checkpoints")
    target_points = request.json.get("target_points")
    weekday = request.json.get("weekday")
    frequency = request.json.get("frequency")

    if frequency != 1:
        weekday = 0

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

    message = set_deadline(
        user["id"],
        date,
        course_id,
        exercises,
        checkpoints,
        target_points,
        frequency,
        weekday,
    )

    return jsonify(message=message)


@deadline.route("/<course_id>", methods=["GET", "DELETE"])
def get_or_delete_deadline(course_id):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    if request.method == "GET":
        deadline = json.loads(get_course_deadline(user["id"], course_id))
        checkpoints = get_checkpoints(user["id"], course_id)

        if deadline:
            deadline["checkpoints"] = json.loads(checkpoints)

        return jsonify(deadline)

    if request.method == "DELETE":
        if not course_id:
            return jsonify(message="Missing fields"), 400

        message = delete_deadline(user["id"], course_id)

        return jsonify(message=message)
