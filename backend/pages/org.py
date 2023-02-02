from flask import Blueprint, jsonify
import requests

org = Blueprint("org", __name__)

@org.route("/", methods=["GET"])
def get_org():
    response = requests.get("https://tmc.mooc.fi/api/v8/org.json", headers={"Accept": "application/json"})
    if response.status_code == 403:
        return jsonify(error='Forbidden'), 403
    if response.status_code == 404:
        return jsonify(error='Not Found'), 404
    return response.json()
