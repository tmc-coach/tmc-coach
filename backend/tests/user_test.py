import os
from unittest import TestCase
from backend.modules.user import encode_jwt, decode_jwt


class UserTestCase(TestCase):
    def setUp(self) -> None:
        os.environ["JWT_SECRET"] = "StaticJWTSecretForTestingPurposes"
        self._username = "testikayttaja@osoite.fi"
        self._token = "StaticTestTokenForTesting"

    def tearDown(self) -> None:
        del os.environ["JWT_SECRET"]

    def test_encode(self):
        encoded_jwt = encode_jwt(str(self._token), str(self._username))
        self.assertNotEqual(self._username, encoded_jwt)

    def test_decode(self):
        encoded_jwt = encode_jwt(str(self._token), str(self._username))
        decoded_jwt = decode_jwt(encoded_jwt)
        self.assertEqual(
            {"username": self._username, "token": self._token}, decoded_jwt
        )
