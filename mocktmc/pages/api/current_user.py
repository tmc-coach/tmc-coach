from flask import Blueprint, request
from ..mock import MockTMC


user = Blueprint("user", __name__)


@user.route("/users/current", methods=["GET"])
def get_user():
    mock = MockTMC.get_instance()

    data = request.headers["Authorization"]
    response = mock.get_user(data)

    return response
