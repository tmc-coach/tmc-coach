from flask import Blueprint, jsonify, request
from modules.user import decode_jwt
import requests
import json

courses = Blueprint("courses", __name__)


@courses.route("/<course_id>/exercises", methods=["GET"])
def get_exercises(course_id):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    response_exercises = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/exercises",
        headers={"Accept": "application/json", "Authorization": token["token"]},
    )
    response_name = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}",
        headers={"Accept": "application/json", "Authorization": token["token"]},
    )

    if response_exercises.status_code == 403 or response_name.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response_exercises.status_code == 404 or response_name.status_code == 404:
        return jsonify(error="Not Found"), 404

    data = response_exercises.json()
    awarded_points = 0
    maximum_exercises = 0

    for item in data:
        maximum_exercises += len(item["available_points"])
        awarded_points += len(item["awarded_points"])

    if maximum_exercises == 0:
        maximum_exercises = -1

    course_title = response_name.json()
    results = [
        {
            "completed_percentage": round(
                (awarded_points / maximum_exercises) * 100, 1
            ),
            "awarded_points": awarded_points,
            "maximum_exercises": maximum_exercises,
            "course_title": course_title["title"],
            "disabled_status": course_title["disabled_status"],
        }
    ]

    return json.dumps(results)
