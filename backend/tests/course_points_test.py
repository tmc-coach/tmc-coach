import json
import unittest
import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from flask.testing import FlaskClient
from backend.pages.courses import courses
from backend.pages.auth import auth
from backend.pages.org import org
from dotenv import load_dotenv
from modules.user import encode_jwt


class TestCoursesPoints(unittest.TestCase):
    def setUp(self):
        load_dotenv()
        dirname = os.path.dirname(__file__)

        try:
            load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
        except FileNotFoundError:
            pass

        self.app = Flask(__name__)
        CORS(self.app)
        self.app.register_blueprint(org, url_prefix="/org")
        self.app.register_blueprint(courses, url_prefix="/courses")
        self.client = self.app.test_client()
        # set secret key
        self.app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
        self.app.config["CLIENT_ID"] = os.getenv("CLIENT_ID")
        self.app.config["CLIENT_SECRET"] = os.getenv("CLIENT_SECRET")
        self.app.config["USERNAME"] = os.getenv("TMCUSERNAME")
        self.app.config["PASSWORD"] = os.getenv("TMCPASSWORD")

        response = requests.post(
            "https://tmc.mooc.fi/oauth/token",
            data={
                "client_id": self.app.config["CLIENT_ID"],
                "client_secret": self.app.config["CLIENT_SECRET"],
                "username": self.app.config["USERNAME"],
                "password": self.app.config["PASSWORD"],
                "grant_type": "password",
            },
        )

        if response.status_code != 200:
            return jsonify(error="invalid username or password"), 401

        self.token = (
            f"{response.json()['token_type']} {response.json()['access_token']}"
        )
        self.user = requests.get(
            "https://tmc.mooc.fi/api/v8/users/current",
            headers={"Authorization": self.token},
        )
        self.user_id = self.user.json()["id"]

        self.encoded_jwt = encode_jwt(
            self.app.config["USERNAME"], self.token, self.user_id
        )
        self.headers = {"Authorization": self.encoded_jwt}

        self.app.config["TESTING"] = True
        return self.app

    def test_get_exercises_not_auth(self):
        response = self.client.get("/org/778/courses")
        response_t = response.text
        expected_response = '{"error":"Authorization header missing"}\n'
        self.assertEqual(response_t, expected_response)

    def test_get_exercises_with_wrong_courseid(self):
        expected_response = '{"error":"Not Found"}\n'
        response = self.client.get("/org/778884651/courses", headers=self.headers)
        self.assertEqual(response.text, expected_response)
