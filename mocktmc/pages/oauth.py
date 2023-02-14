from flask import Blueprint, request
from .mock import MockTMC
from urllib.parse import parse_qs


oauth = Blueprint("oauth", __name__)


@oauth.route("/token", methods=["POST"])
def authorize():
    data = request.get_data()
    request_data = dict(parse_qs(data.decode("utf-8")))
    request_data_parsed = {}
    for key, val in request_data.items():
        request_data_parsed[key] = str(val[0])

    mock = MockTMC.get_instance()

    response = mock.authorize(
        (
            request_data_parsed["grant_type"],
            request_data_parsed["username"],
            request_data_parsed["password"],
            request_data_parsed["client_id"],
            request_data_parsed["client_secret"],
        )
    )

    return response
