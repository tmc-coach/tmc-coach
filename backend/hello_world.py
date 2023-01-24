from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify(message='Hello TMC Coach!')


@app.route('/techdemo')
def techdemo():
    return jsonify(link='https://www.youtube.com/watch?v=dQw4w9WgXcQ')


if __name__ == '__main__':
    app.run()
