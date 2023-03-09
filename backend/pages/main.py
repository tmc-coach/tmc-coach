from flask import Blueprint, jsonify
from app import db

main = Blueprint("main", __name__)


@main.route("/")
def hello_world():
    return jsonify(message="Hello TMC Coach!")


@main.route("/techdemo")
def techdemo():
    return jsonify(link="https://www.youtube.com/watch?v=dQw4w9WgXcQ")
