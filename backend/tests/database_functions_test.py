from unittest import TestCase
import json
import os
from app import db, create_app
from sqlalchemy.sql import text
from datetime import date, datetime
from dotenv import load_dotenv
from modules.deadline import (
    set_deadline,
    get_deadlines,
    delete_deadline,
    get_course_deadline,
    get_deadline_infos,
)
from modules.checkpoint import get_checkpoint_infos
import datetime


class DeadlinesTestCase(TestCase):
    def setUp(self):
        self.app = create_app()
        self.user_id = os.getenv("TMCUSERID")
        self.course_id = 1169
        self.exercises = [
            {
                "id": 188014,
                "available_points": [
                    {
                        "id": 1280887,
                        "exercise_id": 188014,
                        "name": "7.kuka_huijasi_2",
                        "requires_review": False,
                    }
                ],
                "awarded_points": [],
                "name": "osa07-15_kuka_huijasi_2",
                "publish_time": None,
                "solution_visible_after": None,
                "deadline": None,
                "soft_deadline": None,
                "disabled": False,
                "unlocked": True,
            },
            {
                "id": 188018,
                "available_points": [
                    {
                        "id": 1280891,
                        "exercise_id": 188018,
                        "name": "7.spellchecker_versio2",
                        "requires_review": False,
                    }
                ],
                "awarded_points": [],
                "name": "osa07-16_spellchecker_versio2",
                "publish_time": None,
                "solution_visible_after": None,
                "deadline": None,
                "soft_deadline": None,
                "disabled": False,
                "unlocked": True,
            },
            {
                "id": 188021,
                "available_points": [
                    {
                        "id": 1280895,
                        "exercise_id": 188021,
                        "name": "7.merkkiapuri",
                        "requires_review": False,
                    }
                ],
                "awarded_points": [],
                "name": "osa07-17_merkkiapuri",
                "publish_time": None,
                "solution_visible_after": None,
                "deadline": None,
                "soft_deadline": None,
                "disabled": False,
                "unlocked": True,
            },
            {
                "id": 188008,
                "available_points": [
                    {
                        "id": 1280880,
                        "exercise_id": 188008,
                        "name": "7.omakieli-osa1",
                        "requires_review": False,
                    },
                    {
                        "id": 1280881,
                        "exercise_id": 188008,
                        "name": "7.omakieli-osa2",
                        "requires_review": False,
                    },
                ],
                "awarded_points": [],
                "name": "osa07-18_oma_ohjelmointikieli",
                "publish_time": None,
                "solution_visible_after": None,
                "deadline": None,
                "soft_deadline": None,
                "disabled": False,
                "unlocked": True,
            },
        ]

    def test_get_deadlines_only_gets_deadlines_that_have_been_made_by_the_user(self):
        with self.app.app_context():
            deadlines = get_deadlines(self.user_id)

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
        deadline_str = "18/2/2025"

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date": date_for_deadline})
            deadlines = result.fetchall()

        self.assertEqual(len(deadlines), 0)

        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date": date_for_deadline})
            deadlines = result.fetchall()

        self.assertEqual(len(deadlines), 1)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE date=:date"
            result = db.session.execute(text(sql), {"date": date_for_deadline})
            deadlines = result.fetchall()

        self.assertEqual(len(deadlines), 0)

    def test_set_deadline_has_created_at_column(self):
        date_for_deadline = datetime.datetime(2028, 5, 27)
        deadline_str = "27/5/2028"
        date_now = datetime.datetime.now().date()

        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(
                text(sql),
                {
                    "user_id": self.user_id,
                    "course_id": self.course_id,
                    "date": date_for_deadline,
                },
            )
            deadlines = result.fetchall()
            self.assertEqual(len(deadlines), 1)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_when_new_deadline_added_then_overwrite_old_deadline(self):
        old_deadline = datetime.datetime(2028, 5, 27)
        new_deadline = datetime.datetime(2028, 7, 11)
        old_deadline_str = "27/5/2028"
        new_deadline_str = "11/7/2028"

        with self.app.app_context():
            set_deadline(
                self.user_id, old_deadline_str, self.course_id, self.exercises, 3
            )

        with self.app.app_context():
            sql = "SELECT COUNT(course_id) FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(
                text(sql),
                {
                    "user_id": self.user_id,
                    "course_id": self.course_id,
                    "date": old_deadline,
                },
            )
            deadlines = result.fetchall()
            self.assertEqual(int(deadlines[0][0]), 1)

        with self.app.app_context():
            set_deadline(
                self.user_id, new_deadline_str, self.course_id, self.exercises, 3
            )

        with self.app.app_context():
            sql = "SELECT COUNT(course_id) FROM deadlines WHERE user_id=:user_id AND course_id=:course_id AND date=:date"
            result = db.session.execute(
                text(sql),
                {
                    "user_id": self.user_id,
                    "course_id": self.course_id,
                    "date": new_deadline,
                },
            )
            deadlines = result.fetchall()
            self.assertEqual(int(deadlines[0][0]), 1)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_deleting_deadline_permanently(self):
        deadline_str = "27/5/2028"

        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

        with self.app.app_context():
            sql = "SELECT course_id FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            course_id = result.fetchall()
            self.assertEqual(int(course_id[0][0]), self.course_id)

        with self.app.app_context():
            deleted_deadline = delete_deadline(self.user_id, self.course_id)
            self.assertEqual(deleted_deadline, "Course deadline deleted succesfully!")

        with self.app.app_context():
            sql = "SELECT * FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            deadline = result.fetchall()
            self.assertEqual(deadline, [])

    def test_deleting_deadline_deletes_its_related_checkpoints(self):
        deadline_str = "27/5/2028"

        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

        with self.app.app_context():
            sql = "SELECT course_id FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(len(checkpoints), 3)

        with self.app.app_context():
            deleted_deadline = delete_deadline(self.user_id, self.course_id)
            self.assertEqual(deleted_deadline, "Course deadline deleted succesfully!")

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(checkpoints, [])

    def test_get_deadline_function_gets_the_right_deadline(self):
        deadline = ""
        deadline_str = "27/5/2025"

        with self.app.app_context():
            deadline = get_course_deadline(int(self.user_id), 1234)
            self.assertEqual(deadline, "[]")

        with self.app.app_context():
            set_deadline(int(self.user_id), deadline_str, 1234, self.exercises, 3)

        with self.app.app_context():
            deadline = get_course_deadline(int(self.user_id), 1234)

            dictionary = json.loads(deadline)
            self.assertEqual(dictionary["user_id"], int(self.user_id))
            self.assertEqual(dictionary["course_id"], 1234)
            self.assertEqual(dictionary["date"], "2025-05-27 00:00:00")

        with self.app.app_context():
            delete_deadline(self.user_id, 1234)

    def test_changing_deadline_changes_checkpoints_and_doesnt_only_make_new(self):
        deadline_str = "24/5/2028"
        new_deadline_str = "15/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(len(checkpoints), 3)

        with self.app.app_context():
            set_deadline(
                self.user_id, new_deadline_str, self.course_id, self.exercises, 3
            )

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints_2 = result.fetchall()
            self.assertEqual(len(checkpoints_2), 3)
            self.assertNotEqual(checkpoints, checkpoints_2)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_set_deadline_saves_target_points_to_deadlines_table(self):
        deadline_str = "16/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

            sql = "SELECT target_points FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            ).fetchall()
            self.assertEqual(result[0][0], 5)
        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)


    def test_changing_target_points_changes_point_targets_in_checkpoints(self):
        deadline_str = "24/5/2028"
        with self.app.app_context():
            set_deadline(
                self.user_id, deadline_str, self.course_id, self.exercises, 3, 4
            )

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(checkpoints[0][-1], 1)
            self.assertEqual(checkpoints[1][-1], 2)
            self.assertEqual(checkpoints[2][-1], 3)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_set_deadline_saves_current_points_to_deadlines_table(self):
        deadline_str = "16/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

            sql = "SELECT current_points FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            ).fetchall()
            self.assertEqual(result[0][0], 0)
        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)


    def test_cannot_set_target_points_bigger_than_max_course_points(self):
        deadline_str = "24/5/2028"

        with self.app.app_context():
            set_deadline(
                self.user_id, deadline_str, self.course_id, self.exercises, 3, 6
            )

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(len(checkpoints), 0)
        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_set_deadline_saves_desired_points_to_checkpoints_table(self):
        deadline_str = "16/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

            sql = "SELECT desired_points FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            ).fetchall()
            self.assertEqual(result[0][0], 1)
            self.assertEqual(result[1][0], 3)
            self.assertEqual(result[2][0], 4)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_get_deadline_infos_gives_info_correctly(self):
        deadline_str = "16/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

            info = get_deadline_infos(deadline_str)
            self.assertEqual(len(info[0]), 6)
            self.assertEqual(info[0][2], int(self.user_id))

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_get_checkpoint_infos_gives_info_correctly(self):
        deadline_str = "16/6/2028"
        with self.app.app_context():
            set_deadline(self.user_id, deadline_str, self.course_id, self.exercises, 3)

            sql = "SELECT checkpoint_date FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id and checkpoint_percent=25"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            ).fetchall()
            checkpoint_date = result[0][0].strftime("%d.%m.%Y")

            info = get_checkpoint_infos(checkpoint_date)
            self.assertEqual(len(info[0]), 7)
            self.assertEqual(info[0][2], int(self.user_id))

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)

    def test_cannot_set_target_points_smaller_than_current_course_points(self):
        deadline_str = "24/5/2028"

        with self.app.app_context():
            set_deadline(
                self.user_id, deadline_str, self.course_id, self.exercises, 3, -1
            )

        with self.app.app_context():
            sql = "SELECT * FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
            result = db.session.execute(
                text(sql), {"user_id": self.user_id, "course_id": self.course_id}
            )
            checkpoints = result.fetchall()
            self.assertEqual(len(checkpoints), 0)

        with self.app.app_context():
            delete_deadline(self.user_id, self.course_id)
