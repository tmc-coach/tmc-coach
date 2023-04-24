import unittest
from unittest import TestCase
import json
import os
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
from modules.checkpoint import (
    set_checkpoints,
    get_checkpoints,
)
import datetime
from app import create_app, db


class CheckpointsTestCase(TestCase):
    def setUp(self):
        self.app = create_app()

        self.current_points = 50
        self.target_points = 100

    def test_set_checkpoints_adds_checkpoints_to_the_database(self):
        user_id = os.getenv("TMCUSERID")
        course_id = 1
        created_at = datetime.datetime(2023, 3, 6)
        date_for_deadline = datetime.datetime(2023, 4, 3)

        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                3,
                self.current_points,
                self.target_points,
            )
            db.session.commit()

        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            checkpoints = result.fetchall()

        self.assertEqual(len(checkpoints), 3)

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()

    def test_set_checkpoints_add_the_right_amount_of_checkpoints(self):
        user_id = os.getenv("TMCUSERID")
        course_id = 2
        created_at = datetime.datetime(2023, 3, 6)
        date_for_deadline = datetime.datetime(2023, 4, 3)

        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                14,
                self.current_points,
                self.target_points,
            )
            db.session.commit()

        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            checkpoints = result.fetchall()

        self.assertEqual(len(checkpoints), 14)

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()

    def test_set_checkpoints_does_not_set_any_checkpoints_if_the_deadline_is_too_close(
        self,
    ):
        user_id = os.getenv("TMCUSERID")
        course_id = 3
        created_at = datetime.datetime(2023, 3, 6)
        date_for_deadline = datetime.datetime(2023, 3, 9)

        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                3,
                self.current_points,
                self.target_points,
            )
            db.session.commit()

        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            checkpoints = result.fetchall()

        self.assertEqual(len(checkpoints), 0)

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()

    def test_get_checkpoints_gets_the_right_checkpoints(self):
        user_id = os.getenv("TMCUSERID")
        course_id = 4
        created_at = datetime.datetime(2023, 3, 6)
        date_for_deadline = datetime.datetime(2023, 3, 17)

        checkpoints = {}

        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                5,
                self.current_points,
                self.target_points,
            )
            db.session.commit()

        with self.app.app_context():
            checkpoints = get_checkpoints(user_id, course_id)

        dictionary = json.loads(checkpoints)

        self.assertEqual(len(dictionary), 5)

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()

        for checkpoint in dictionary:
            self.assertEqual(checkpoint["user_id"], int(user_id))
            self.assertEqual(checkpoint["course_id"], int(course_id))

    def test_weekly_checkpoints_are_on_the_right_weekday(self):
        user_id = os.getenv("TMCUSERID")
        course_id = 4
        created_at = datetime.datetime(2023, 4, 24)
        date_for_deadline = datetime.datetime(2023, 5, 19)

        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                2,
                self.current_points,
                self.target_points,
                1,
                3
            )
            db.session.commit()

        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            checkpoints = result.fetchall()

        self.assertEqual(len(checkpoints), 2)

        for i in range(len(checkpoints)):
            if i == 1:
                self.assertEqual(datetime.date(2023, 5, 10), checkpoints[i][3])
            if i == 0:
                self.assertEqual(datetime.date(2023, 5, 3), checkpoints[i][3])

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()
        
        with self.app.app_context():
            set_checkpoints(
                user_id,
                course_id,
                created_at,
                date_for_deadline,
                2,
                self.current_points,
                self.target_points,
                1,
                6
            )
            db.session.commit()

        checkpoints = []

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            checkpoints = result.fetchall()

        self.assertEqual(len(checkpoints), 3)

        for i in range(len(checkpoints)):
            if i == 2:
                self.assertEqual(datetime.date(2023, 5, 13), checkpoints[i][3])
            if i == 1:
                self.assertEqual(datetime.date(2023, 5, 6), checkpoints[i][3])
            if i == 0:
                self.assertEqual(datetime.date(2023, 4, 29), checkpoints[i][3])

        with self.app.app_context():
            sql = "DELETE FROM checkpoints WHERE user_id=:user_id and course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": user_id, "course_id": course_id}
            )
            db.session.commit()

