import unittest
import json
from flask import Flask
from flask_cors import CORS
from flask_testing import TestCase
from backend.pages.auth import auth


class AuthRouteTestCase(TestCase):
    def create_app(self):
        app = Flask(__name__)
        CORS(app)
        app.register_blueprint(auth, url_prefix="/auth")
        app.config["TESTING"] = True
        return app

    def test_user_route_without_authorization(self):
        response = self.client.get("/auth/user")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            json.loads(response.data), {"error": "Authorization header is required"}
        )

    def test_user_route_with_invalid_token(self):
        headers = {"Authorization": "this-is-not-a-valid-token-1337"}
        response = self.client.get("/auth/user", headers=headers)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(json.loads(response.data), {"error": "Invalid token"})


if __name__ == "__main__":
    unittest.main()
