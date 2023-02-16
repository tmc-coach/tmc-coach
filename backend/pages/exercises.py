from flask import Blueprint, jsonify, request
from modules.user import decode_jwt
import requests

exercises = Blueprint("exercises", __name__)


@exercises.route("/<course_id>", methods=["GET"])
def get_course(course_id):
    print(course_id, "ok2")
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    print(token)
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/exercises", headers={"Accept": "application/json", "Authorization": token["token"]}
        )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()