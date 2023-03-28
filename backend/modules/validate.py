from datetime import datetime

def validate_id(raw_id):
    if not raw_id.isnumeric():
        return False
    return True

def validate_date(date):
    try:
        print(date)
        date_obj = datetime.strptime(date, "%A, %d %B %Y")
        print(date_obj)

        datetime.strptime(date_obj.strftime("%Y-%m-%d"), "%Y-%m-%d")
        # check that the date is in the future
        if date_obj < datetime.now():
            return False
        return True
    except ValueError:
        return False