from flask import Blueprint, jsonify, request
from modules.user import decode_jwt
import requests
import json

exercises = Blueprint("exercises", __name__)


@exercises.route("/<course_id>", methods=["GET"])
def get_exercises(course_id):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    response_exercises = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/exercises", headers={"Accept": "application/json", "Authorization": token["token"]}
        )
    response_name = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}", headers={"Accept": "application/json", "Authorization": token["token"]})

    
    if response_exercises.status_code == 403 or response_name.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response_exercises.status_code == 404 or response_name.status_code == 404:
        return jsonify(error="Not Found"), 404


    data = response_exercises.json()
    awarded_points = 0
    maximum_exercises = 0

    for item in data:
        maximum_exercises += len(item['available_points'])
        awarded_points += len(item['awarded_points'])
    
    course_title = response_name.json()
    
    results = [{"awarded_points": awarded_points, "maximum_exercises": maximum_exercises, "course_title": course_title['title']}]

    return json.dumps(results)