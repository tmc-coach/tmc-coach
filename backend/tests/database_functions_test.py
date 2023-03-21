import unittest
from unittest import TestCase
import json
import os
from app import db, create_app
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
from database_functions.deadline_functions import get_deadlines_function
from database_functions.deadline_functions import set_deadline_function
import datetime


class DeadlinesTestCase(TestCase):
    def setUp(self):
        self.app = create_app()
        self.user_id = os.getenv("TMCUSERID")
        self.course_id = 1169

    def test_get_deadlines_only_gets_deadlines_that_have_been_made_by_the_user(self):
        with self.app.app_context():
            deadlines = get_deadlines_function(self.user_id)

        dictionary = json.loads(deadlines)

        i = 0
        while True:
            try:
                deadline = dictionary[i]
                self.assertEqual(deadline["user_id"], self.user_id)
            except:
                break

    def test_set_deadlines_adds_a_deadline_to_database(self):
        date_for_deadline = datetime.datetime(2025, 2, 18)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date":date_for_deadline})
            deadlines = result.fetchall() 

        self.assertEqual(len(deadlines), 0)

        with self.app.app_context():
            set_deadline_function(self.user_id, date_for_deadline, self.course_id)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date":date_for_deadline})
            deadlines = result.fetchall() 

        self.assertEqual(len(deadlines), 1) 

        with self.app.app_context():
            sql = "DELETE FROM deadlines WHERE date=:date AND course_id=:course_id"
            result = db.session.execute(text(sql), {"date":date_for_deadline, "course_id":self.course_id})
            db.session.commit()

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date":date_for_deadline})
            deadlines = result.fetchall()
 
        self.assertEqual(len(deadlines), 0)  

    def test_set_deadline_has_created_at_column(self):
        date_for_deadline = datetime.datetime(2028, 5, 27)
        date_now = datetime.datetime.now().date()

        with self.app.app_context():
            set_deadline_function(self.user_id, date_for_deadline, self.course_id)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(text(sql), {"user_id": self.user_id, "course_id": self.course_id, "date":date_for_deadline})
            deadlines = result.fetchall()
            self.assertEqual(len(deadlines), 1)

        with self.app.app_context():
            sql = "DELETE FROM deadlines WHERE date=:date AND created_at=:created_at AND course_id=:course_id"
            result = db.session.execute(text(sql), {"date":date_for_deadline, "created_at":date_now, "course_id":self.course_id})
            db.session.commit()
