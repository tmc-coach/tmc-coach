import unittest
import json
import os
from flask import Flask
from flask_cors import CORS
from flask_testing import TestCase
from app import db
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
import requests
from backend.pages.deadline import deadline
from backend.pages.auth import auth


class DeadlineTestCase(TestCase):
    def create_app(self):
        load_dotenv()
        dirname = os.path.dirname(__file__)

        try:
            load_dotenv(dotenv_path=os.path.join(dirname, ".", ".env"))
        except FileNotFoundError:
            pass

        app = Flask(__name__)
        CORS(app)

        # set secret key
        app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
        app.config["CLIENT_ID"] = os.getenv("CLIENT_ID")
        app.config["CLIENT_SECRET"] = os.getenv("CLIENT_SECRET")
        #app.config["USERNAME"] = os.getenv("TMCUSERNAME")
        #app.config["PASSWORD"] = os.getenv("TMCPASSWORD")

        app.register_blueprint(deadline, url_prefix="/deadline")
        app.register_blueprint(auth, url_prefix="/auth")
        app.config["TESTING"] = True
        return app

        # def setUp(self):
        try:
            sql = "SELECT * FROM deadlines"
            db.session.execute(text(sql))
        except:
            sql = "CREATE TABLE deadlines (id SERIAL PRIMARY KEY, username TEXT, course_id INTEGER, date DATE)"
            db.session.execute(text(sql))
            db.session.commit()

    #def test_set_deadline(self):
        baseUrl = 'http://localhost:5000'
        credentials = {"username": os.getenv("TMCUSERNAME"), "password": os.getenv("TMCPASSWORD")}
        response1 = requests.post(baseUrl + '/auth/authorize', data=json.dumps(credentials))
        self.assertEqual(response1.status_code, response1)
        #data =  {"username": "käyttäjänimi", "course_id": 277, "date": date.today()}
        #response = self.client.post("/deadline/set_deadline", data=data)
        #self.assertEqual(response.status_code, response)


