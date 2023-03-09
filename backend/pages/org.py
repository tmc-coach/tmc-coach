from flask import Blueprint, jsonify, request
from modules.user import decode_jwt
import requests

org = Blueprint("org", __name__)


@org.route("/", methods=["GET"])
def get_org():
    response = requests.get(
        "https://tmc.mooc.fi/api/v8/org.json", headers={"Accept": "application/json"}
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()


@org.route("/<org_slug>/courses", methods=["GET"])
def get_course(org_slug):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/core/org/{org_slug}/courses.json",
        headers={"Accept": "application/json", "Authorization": token["token"]},
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()
