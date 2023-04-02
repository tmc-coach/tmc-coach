from datetime import datetime


def validate_id(raw_id):
    try:
        if not raw_id.isnumeric():
            return False
        return True
    except:
        return False


def validate_date(date):
    try:
        date_obj = datetime.strptime(date, "%d/%m/%Y")
        datetime.strptime(date_obj.strftime("%Y-%m-%d"), "%Y-%m-%d")
        # check that the date is in the future
        if date_obj < datetime.now():
            return False
        return True
    except ValueError:
        return False
