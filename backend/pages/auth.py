from flask import Blueprint, jsonify, request, Response
from modules.user import *
import requests
import os
import jwt

auth = Blueprint("auth", __name__)

@auth.route("/authorize", methods=["POST"])
def authorize():

    username = request.json.get("username")
    password = request.json.get("password")

    if not username:
        return jsonify(error='username is required'), 400
    if not password:
        return jsonify(error='password is required'), 400

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
        return jsonify(error='invalid username or password'), 401

    token = f"{response.json()['token_type']} {response.json()['access_token']}"
    encoded_jwt = encode_jwt(username, token)
    return jsonify(jwt=encoded_jwt)
