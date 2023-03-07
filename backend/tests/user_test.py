import os
from unittest import TestCase
from backend.modules.user import encode_jwt, decode_jwt


class UserTestCase(TestCase):
    def setUp(self) -> None:
        os.environ["JWT_SECRET"] = "StaticJWTSecretForTestingPurposes"
        self._username = "testikayttaja@osoite.fi"
        self._token = "StaticTestTokenForTesting"
        self._user_id = 12345

    def tearDown(self) -> None:
        del os.environ["JWT_SECRET"]

    def test_encode(self):
        encoded_jwt = encode_jwt(str(self._token), str(self._username), self._user_id)
        self.assertNotEqual(self._username, encoded_jwt)

    def test_decode(self):
        encoded_jwt = encode_jwt(str(self._username), str(self._token), self._user_id)
        decoded_jwt = decode_jwt(encoded_jwt)
        self.assertEqual(
            {"token": self._token, "username": self._username, "id": self._user_id}, decoded_jwt
        )
