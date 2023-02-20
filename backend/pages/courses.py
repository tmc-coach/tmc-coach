from flask import Blueprint, jsonify
import requests

courses = Blueprint("courses", __name__)


@courses.route("/<org_id>", methods=["GET"])
def get_course(org_id):
    org_slug = org_id
    response = requests.get(
        f"https://tmc.mooc.fi/api/v8/core/org/{org_slug}/courses.json",
        headers={"Accept": "application/json"},
    )
    if response.status_code == 403:
        return jsonify(error="Forbidden"), 403
    if response.status_code == 404:
        return jsonify(error="Not Found"), 404
    return response.json()
