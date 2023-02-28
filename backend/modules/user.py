import jwt
import os


def decode_jwt(encoded_jwt):
    try:
        return jwt.decode(encoded_jwt, os.getenv("JWT_SECRET"), algorithms=["HS256"])
    except:
        return None


def encode_jwt(username, token):
    return jwt.encode(
        {"username": username, "token": token},
        os.getenv("JWT_SECRET"),
        algorithm="HS256",
    )

def get_user(token):
    valid = decode_jwt(token)
    
    if valid:
        return valid["username"]
    
    return None
    
