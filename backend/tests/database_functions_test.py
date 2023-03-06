import unittest
from unittest import TestCase
import json
import os
from app import db
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
from database_functions.get_deadlines import get_deadlines_function
from database_functions.set_deadline import set_deadline_function
import datetime



class DeadlinesTestCase(TestCase):
    def test_get_deadlines_only_gets_deadlines_that_have_been_made_by_the_user(self):
        username = os.getenv("TMCUSERNAME")
        deadlines = get_deadlines_function(username)
        dictionary = json.loads(deadlines)

        i = 0
        while True:
            try:
                deadline = dictionary[i]
                self.assertEqual(deadline["username"], username)
            except:
                break

    def test_set_deadlines_adds_a_deadline_to_database(self):
        username = os.getenv("TMCUSERNAME")
        course_id = 1169
        date_for_deadline = datetime.datetime(2025, 2, 18)

        sql = "SELECT * FROM deadlines WHERE date=:date"
        result = db.session.execute(text(sql), {"date":date_for_deadline})
        deadlines = result.fetchall() 

        self.assertEqual(len(deadlines), 0)

        set_deadline_function(username, date_for_deadline, course_id)

        sql = "SELECT * FROM deadlines WHERE date=:date"
        result = db.session.execute(text(sql), {"date":date_for_deadline})
        deadlines = result.fetchall() 

        self.assertEqual(len(deadlines), 1) 

        sql = "DELETE FROM deadlines WHERE date=:date"
        result = db.session.execute(text(sql), {"date":date_for_deadline})
        db.session.commit()

        sql = "SELECT * FROM deadlines WHERE date=:date"
        result = db.session.execute(text(sql), {"date":date_for_deadline})
        deadlines = result.fetchall()
 
        self.assertEqual(len(deadlines), 0)  
