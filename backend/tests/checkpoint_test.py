import unittest
from unittest import TestCase
import json
import os
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
from database_functions.checkpoint_functions import *
import datetime
from app import create_app, db

class DeadlinesTestCase(TestCase):
    def setUp(self):
        self.app = create_app()

    def test_set_checkpoints_adds_checkpoints_to_the_database(self):
        user_id = os.getenv("TMCUSERID")
        course_id = 1169
        created_at = datetime.datetime(2023, 3, 6)
        date_for_deadline = datetime.datetime(2023, 4, 3)

        with self.app.app_context():
            set_checkpoints_function(user_id, course_id, created_at, date_for_deadline, 3)
        
        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(text(sql), {"user_id":user_id, "course_id":course_id})
            checkpoints = result.fetchall()
        
        self.assertEqual(len(checkpoints), 3)

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(text(sql), {"user_id":user_id, "course_id":course_id})
            db.session.commit()

