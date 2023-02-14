from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
import requests

courses = Blueprint("courses", __name__)


@courses.route("/<org_id>", methods=["GET"])
def get_course(org_id):
    org_slug = org_id
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    print(token)
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/core/org/{org_slug}/courses.json", headers={"Accept": "application/json", "Authorization": token["token"]}
        )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()