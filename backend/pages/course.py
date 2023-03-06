from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
import requests

course = Blueprint("course", __name__)


@course.route("/<course_id>", methods=["GET"])
def get_course_info(course_id):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    print(token)
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/core/courses/{course_id}",
        headers={"Accept": "application/json", "Authorization": token["token"]},
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()
