from unittest import TestCase
import os
from app import create_app
from database_functions.user_functions import set_user, delete_user


class UsersTestCase(TestCase):
    def setUp(self):
        self.app = create_app()
        self.user_id = 999999999
        self.token = "TOKEN ASDFASDF030999DFS99QWER"
        self.email = os.getenv("TMCUSERNAME")

    def tearDown(self) -> None:
        with self.app.app_context():
            delete_user(self.user_id)

    def test_new_user_is_added(self):
        with self.app.app_context():
            response = set_user(self.user_id, self.token, self.email)
        self.assertEqual(response, "User row created")


    def test_token_is_updated(self):
        with self.app.app_context():
            init_response = set_user(self.user_id, self.token, self.email)
            update_response = set_user(self.user_id, "TOKEN NEWNEWNEWNEWNEWNEW", self.email)

        self.assertEqual(init_response, "User row created")
        self.assertEqual(update_response, "Token updated")
