from datetime import datetime, timedelta, date
from unittest import TestCase
from backend.modules.validate import validate_date, validate_id


class ValidateTestCase(TestCase):
    def test_validate_date_with_invalid_date(self):
        # Date in future, but 30th of February
        test_date_year = int(datetime.now().strftime("%Y")) + 1
        self.assertFalse(validate_date(str(f"30/02/{test_date_year}")))

        # Date in past
        yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")
        self.assertFalse(validate_date(yesterday))

        # Date in different format
        self.assertFalse(validate_date(f"1.1.{test_date_year}"))


    def test_validate_date_with_valid_date(self):
        test_date = datetime.now() + timedelta(days=31)
        test_date_formatted = test_date.strftime("%d/%m/%Y")
        self.assertTrue(validate_date(test_date_formatted))


    def test_validate_id_with_invalid_id(self):
        self.assertFalse(validate_id("ASDF1234"))
        self.assertFalse(validate_id(123123123123))
        self.assertFalse(validate_id("-5"))


    def test_validate_id_with_valid_id(self):
        self.assertTrue(validate_id("1"))
        self.assertTrue(validate_id("00000000000000000003"))