import os
import time
from flask import Response


class MockTMC:
    __instance = None

    @staticmethod
    def get_instance():
        if not MockTMC.__instance:
            MockTMC.__instance = MockTMC()
        return MockTMC.__instance

    def __init__(self) -> None:
        pass

    def authorize(self, credentials: tuple) -> Response:
        """Authorize takes the login credentials and returns access_token if credentials are valid.

        Args:
            credentials (tuple): (grant_type, username, password, client_id, client_secret)

        Returns:
            Response: Response with either valid (200) or invalid (400) status
        """
        (grant_type, username, password, client_id, client_secret) = credentials

        if (
            grant_type == "password"
            and username == os.getenv("TMCUSERNAME")
            and password == os.getenv("TMCPASSWORD")
            and client_id == os.getenv("CLIENT_ID")
            and client_secret == os.getenv("CLIENT_SECRET")
        ):
            response = f"""{{
                    "access_token": "{os.getenv("EXAMPLE_TOKEN")}",
                    "token_type": "Bearer",
                    "scope": "public",
                    "created_at": {int(time.time())}
                }}"""

            return Response(response=response, status=200, mimetype="application/json")

        invalid_response = f"""{{ 
            "error": "invalid_grant",
            "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
        }}"""

        return Response(
            response=invalid_response, status=400, mimetype="application/json"
        )

    def get_user(self, authorization_token: str) -> Response:
        """Get current user (logged in user).

        Args:
            authorization_token (str): Authorization token from request header

        Returns:
            Response: Current user
        """
        (token_type, access_token) = authorization_token.split(" ")
        if token_type == "Bearer" and access_token == os.getenv("EXAMPLE_TOKEN"):
            response = f"""{{
                "user": {{
                    "id": 1,
                    "username": "tmc-test-student",
                    "email": "{os.getenv("TMCUSERNAME")}",
                    "administrator": false
                }}
            }}"""
            return Response(response=response, status=200, mimetype="application/json")

        invalid_response = f"""
            {{
                "error": "Authentication required"
            }}
        """
        return Response(
            response=invalid_response, status=401, mimetype="application/json"
        )
