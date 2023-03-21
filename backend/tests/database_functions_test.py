from unittest import TestCase
import json
import os
from app import db, create_app
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
from database_functions.deadline_functions import get_deadlines_function
from database_functions.deadline_functions import set_deadline_function
from database_functions.deadline_functions import get_deadline_function
from database_functions.deadline_functions import delete_deadline_permanently_function
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

    def test_when_new_deadline_added_then_overwrite_old_deadline(self):
        old_deadline = datetime.datetime(2028, 5, 27)
        new_deadline = datetime.datetime(2028, 7, 11)

        with self.app.app_context():
            set_deadline_function(self.user_id, old_deadline, self.course_id)

        with self.app.app_context():
            sql = "SELECT COUNT(course_id) FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(text(sql), {"user_id": self.user_id, "course_id": self.course_id, "date":old_deadline})
            deadlines = result.fetchall()
            self.assertEqual(int(deadlines[0][0]), 1)
        
        with self.app.app_context():
            set_deadline_function(self.user_id, new_deadline, self.course_id)
        
        with self.app.app_context():
            sql = "SELECT COUNT(course_id) FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(text(sql), {"user_id": self.user_id, "course_id": self.course_id, "date":new_deadline})
            deadlines = result.fetchall()
            self.assertEqual(int(deadlines[0][0]), 1)

        with self.app.app_context():
            sql = "DELETE FROM deadlines WHERE date=:date AND course_id=:course_id AND user_id=:user_id"
            result = db.session.execute(text(sql), {"date":new_deadline, "course_id":self.course_id, "user_id":self.user_id})
            db.session.commit()

    def test_deleting_deadline_permanently(self):
        deadline = datetime.datetime(2028, 5, 27)

        with self.app.app_context():
            set_deadline_function(self.user_id, deadline, self.course_id)
        
        with self.app.app_context():
            sql = "SELECT course_id FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(text(sql), {"user_id": self.user_id, "course_id": self.course_id})
            course_id = result.fetchall()
            self.assertEqual(int(course_id[0][0]), self.course_id)
        
        with self.app.app_context():
            delete_deadline = delete_deadline_permanently_function(self.user_id, self.course_id)
            self.assertEqual(delete_deadline, "Course deadline deleted succesfully!")

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(text(sql), {"user_id": self.user_id, "course_id": self.course_id})
            deadline = result.fetchall()
            self.assertEqual(deadline, [])

    def test_get_deadline_function_gets_the_right_deadline(self):
        deadline = ""
        deadline_date = datetime.datetime(2025, 5, 27)

        with self.app.app_context():
            deadline = get_deadline_function(int(self.user_id), 1234)
            self.assertEqual(deadline, "[]")

        with self.app.app_context():
            set_deadline_function(int(self.user_id), deadline_date, 1234)

        with self.app.app_context():
            deadline = get_deadline_function(int(self.user_id), 1234)

            dictionary = json.loads(deadline)
            self.assertEqual(dictionary["user_id"], int(self.user_id))
            self.assertEqual(dictionary["course_id"], 1234)
            self.assertEqual(dictionary["date"], "2025-05-27 00:00:00")        

        with self.app.app_context():
            delete_deadline_permanently_function(self.user_id, 1234)
