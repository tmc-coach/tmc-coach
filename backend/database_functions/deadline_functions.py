from app import db
from app.models import deadlines
import json
from datetime import *
import datetime

def get_deadlines_function(user_id):
    deadlines_from_database = deadlines.query.filter_by(user_id=user_id).all()
    response = {}
    for i in range(len(deadlines_from_database)):
        response[i] = {"id": deadlines_from_database[i].id,
                       "user_id": deadlines_from_database[i].user_id,
                       "course_id": deadlines_from_database[i].course_id,
                       "date": deadlines_from_database[i].date,
                       "created_at": deadlines_from_database[i].created_at}
    return json.dumps(response, default=str)

def set_deadline_function(user_id, date, course_id):
    try:
        date_now = datetime.datetime.now()
        target = deadlines(user_id=user_id, course_id=course_id, date=date, created_at=date_now)
        db.session.add(target)
        db.session.commit()
        return "Deadline added succesfully!"
    except:
        return "Adding deadline was unsuccessful"
