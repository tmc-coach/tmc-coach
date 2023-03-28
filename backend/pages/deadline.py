import json
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from modules.deadline import (
    set_deadline,
    get_deadlines,
    delete_deadline,
    get_deadline_function,
)

from modules.checkpoint import (
    get_checkpoints,
)
from modules.user import get_user
from app import db
from sqlalchemy.sql import text
import json
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

    date = request.json.get("date")
    course_id = request.json.get("course_id")

    if not date or not course_id:
        return jsonify(message="Missing fields"), 400

    message = set_deadline(user["id"], date, course_id)

    return jsonify(message=message)


@deadline.route("/", methods=["GET"])
def get_all_deadlines():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    deadlines = get_deadlines(user["id"])
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
        deadline = json.loads(get_deadline_function(user["id"], course_id))
        checkpoints = get_checkpoints(user["id"], course_id)
        deadline["checkpoints"] = json.loads(checkpoints)
        return jsonify(deadline)

    if request.method == "DELETE":
        if not course_id:
            return jsonify(message="Missing fields"), 400

        message = delete_deadline(user["id"], course_id)

        return jsonify(message=message)
