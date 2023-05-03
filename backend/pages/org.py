from flask import Blueprint, jsonify, request
from modules.user import get_user
import requests
import json

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


@org.route("/<org_slug>", methods=["GET"])
def get_one_org(org_slug):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    
    user = get_user(auth_header)

    if not user:
        return jsonify(error="Forbidden"), 403
    response = requests.get(
        "https://tmc.mooc.fi/api/v8/org.json",
        headers={"Accept": "application/json", "Authorization": user["token"]},
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404

    data = response.json()
    result = -1

    for item in data:
        if item["slug"] == org_slug:
            result = {
                "name": item["name"],
                "logo_path": item["logo_path"],
                "information": item["information"],
            }

    if result == -1:
        return jsonify(error="Not Found"), 404

    return json.dumps(result)


@org.route("/<org_slug>/courses", methods=["GET"])
def get_course(org_slug):
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    
    user = get_user(auth_header)

    if not user:
        return jsonify(error="Forbidden"), 403
    
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/core/org/{org_slug}/courses.json",
        headers={"Accept": "application/json", "Authorization": user["token"]},
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    if len(response.json()) == 0:
        courses = [{"name": -1}]
        return json.dumps(courses)
    return response.json()
