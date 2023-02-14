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

    def authorize(self, credentials=tuple) -> Response:
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
