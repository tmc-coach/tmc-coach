from flask import Blueprint, jsonify, request, redirect
import requests
import os

auth = Blueprint('auth', __name__)

@auth.route('/authorize', methods=['POST'])
def authorize():

    username = request.data.username
    password = request.data.password

    response = requests.post('https://tmc.mooc.fi/oauth/token', data={
        'client_id': os.getenv("CLIENT_ID"),
        'client_secret': os.getenv("CLIENT_SECRET"),
        'username': username,
        'password': password,
        'grant_type': 'password'
    })

    token = response.json()['token_type'] + " " + \
        response.json()['access_token']
    print(token)

    return redirect('/')
