import json
from flask import Blueprint, jsonify, request
from sqlalchemy import text
from database_functions.deadline_functions import set_deadline_function, get_deadlines_function, delete_deadline_permanently_function
from modules.user import get_user
from modules.validate import validate_date, validate_id
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

    user = get_user(auth_header)
    if not user:
        return jsonify(error="Forbidden"), 403

    date = request.json.get("date")
    if not validate_date(date):
        return jsonify(error="Invalid date"), 400

    course_id = request.json.get("course_id")
    if not validate_id(course_id):
        return jsonify(error="Invalid course id"), 400
    
    if not date or not course_id:
        return jsonify(message="Missing fields"), 400

    message = set_deadline_function(user["id"], date, course_id)
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
        sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
        result = db.session.execute(text(sql), {"user_id": user["id"], "course_id": course_id})
        deadline = result.fetchone()
        
        if not deadline:
            return json.dumps([], default=str)
        
        response = {
            "id": deadline[0],
            "user_id": deadline[1],
            "course_id": deadline[2],
            "date": deadline[3]
            }

        return json.dumps(response, default=str)
    
    if request.method == "DELETE":
        if not course_id:
            return jsonify(message="Missing fields"), 400

        message = delete_deadline_permanently_function(user["id"], course_id)

        return jsonify(message=message)
