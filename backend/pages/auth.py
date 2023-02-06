from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
import requests
import os
import jwt

auth = Blueprint("auth", __name__)
user = Blueprint("user", __name__)


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

    if response.status_code == 401:
        return jsonify(error="invalid username or password"), 401

    token = f"{response.json()['token_type']} {response.json()['access_token']}"
    encoded_jwt = encode_jwt(username, token)
    return jsonify(jwt=encoded_jwt)


@auth.route("/user", methods=["GET"])
def get_user():
    authorization = request.headers.get("Authorization", None)

    try:
        decoded_jwt = decode_jwt(authorization)
    except jwt.DecodeError:
        return jsonify(error="Invalid token"), 401

    headers = {"Authorization": decoded_jwt["username"]}
    response = requests.get("https://tmc.mooc.fi/api/v8/users/current", headers=headers)

    if response.status_code != 200:
        return (
            jsonify(error="Failed to retrieve user information"),
            response.status_code,
        )

    return response.json()
