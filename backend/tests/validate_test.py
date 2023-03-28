from unittest import TestCase
from backend.modules.validate import validate_date, validate_id


class ValidateTestCase(TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_validate_date_with_inavalid_date(self):
        date = "Monday, 29 February 2023"
        self.assertFalse(validate_date(date))

    def test_validate_date_with_valid_date(self):
        date = "Tuesday, 28 March 2023"
        self.assertTrue(validate_date(date))
