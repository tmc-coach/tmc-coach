import jwt
import os


def decode_jwt(encoded_jwt):
    return jwt.decode(encoded_jwt, os.getenv("JWT_SECRET"), algorithms=["HS256"])


def encode_jwt(token, username):
    return jwt.encode(
        {"username": username, "token": token},
        os.getenv("JWT_SECRET"),
        algorithm="HS256",
    )
