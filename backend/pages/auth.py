from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
from modules.user import get_user as user_info
from database_functions.user_functions import set_user, get_user_email
import requests
import os
import jwt
import json

auth = Blueprint("auth", __name__)


@auth.route("/authorize", methods=["POST"])
def authorize():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username:
        return jsonify(error="username is required"), 400
    if not password:
        return jsonify(error="password is required"), 400

    response = requests.post(
        "https://tmc.mooc.fi/oauth/token",
        data={
            "client_id": os.getenv("CLIENT_ID"),
            "client_secret": os.getenv("CLIENT_SECRET"),
            "username": username,
            "password": password,
            "grant_type": "password",
        },
    )

    if response.status_code != 200:
        return jsonify(error="invalid username or password"), 401

    token = f"{response.json()['token_type']} {response.json()['access_token']}"

    user = requests.get(
        "https://tmc.mooc.fi/api/v8/users/current", headers={"Authorization": token}
    )

    set_user(user.json()["id"], token, user.json()["email"])

    encoded_jwt = encode_jwt(username, token, user.json()["id"])
    return jsonify(jwt=encoded_jwt)


@auth.route("/user", methods=["GET"])
def get_user():
    authorization = request.headers.get("Authorization", None)
    if not authorization:
        return jsonify(error="Authorization header is required"), 400

    try:
        decoded_jwt = decode_jwt(authorization)
    except jwt.DecodeError:
        return jsonify(error="Invalid token"), 401

    headers = {"Authorization": decoded_jwt["token"]}
    response = requests.get("https://tmc.mooc.fi/api/v8/users/current", headers=headers)

    if response.status_code != 200:
        return (
            jsonify(error="Failed to retrieve user information"),
            response.status_code,
        )

    return response.json()


@auth.route("/profile", methods=["GET"])
def user_email():
    auth_header = request.headers.get("Authorization", None)
    if not auth_header:
        return jsonify(error="Authorization header missing")
    token = decode_jwt(auth_header)
    user = user_info(auth_header)

    if not user:
        return jsonify(error="Forbidden"), 403

    user_email = get_user_email(user["id"])

    users_courses = []
    for course in user_email["courses"]:
        users_courses.append(course["course_id"])

    for i in range(len(users_courses)):
        response_coursename = requests.get(
            f"https://tmc.mooc.fi/api/v8/courses/{users_courses[i]}",
            headers={"Accept": "application/json", "Authorization": token["token"]},
        )

        if response_coursename.status_code == 403:
            return jsonify(error="Forbidden"), 403
        if response_coursename.status_code == 404:
            return jsonify(error="Not Found"), 404

        course_title = response_coursename.json()
        user_email["titles"].append(course_title["title"])

    return json.dumps(user_email, default=str)
