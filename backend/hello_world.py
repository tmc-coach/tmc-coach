import os
from flask import Flask, jsonify, request, redirect
import requests
from flask_cors import CORS
from dotenv import load_dotenv

# configure environment variables
load_dotenv()
dirname = os.path.dirname(__file__)

try:
    load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
except FileNotFoundError:
    pass


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify(message='Hello TMC Coach!')


@app.route('/techdemo')
def techdemo():
    return jsonify(link='https://www.youtube.com/watch?v=dQw4w9WgXcQ')


# retrieve token
@app.route('/authorize', methods=['GET', 'POST'])
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

    token = response.json()['token_type'] + " " + response.json()['access_token']
    print(token)

    return redirect('/')


if __name__ == '__main__':
    app.run()
