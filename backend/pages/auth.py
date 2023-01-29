from flask import Blueprint, jsonify, request, redirect, Response, session
import requests
import os
import jwt

auth = Blueprint('auth', __name__)

@auth.route('/authorize', methods=['POST'])
def authorize():

    username = request.json.get('username')
    password = request.json.get('password')

    response = requests.post('https://tmc.mooc.fi/oauth/token', data={
        'client_id': os.getenv("CLIENT_ID"),
        'client_secret': os.getenv("CLIENT_SECRET"),
        'username': username,
        'password': password,
        'grant_type': 'password'
    })

    print(response)
    token = response.json()['access_token']

    # pack token into jwt
    encoded_jwt = jwt.encode({'token': token}, os.getenv("JWT_SECRET"), algorithm='HS256')


    # set jwt as httpnonly cooki
    session["jwt"] = encoded_jwt

    #return statuscode 200
    return Response(status=200)

@auth.route('/test', methods=['GET'])
def test():
    # get jwt from the http only cookie
    encoded_jwt = session.get("jwt")
    print(encoded_jwt)

    # decode jwt
    decoded_jwt = jwt.decode(encoded_jwt, os.getenv("JWT_SECRET"), algorithms=['HS256'])

    return decoded_jwt