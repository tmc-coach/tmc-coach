from app import db
from app.models import deadlines
import json
from datetime import *
import datetime
from sqlalchemy import text

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
    id = check_existing_deadline_function(user_id, course_id)
    date_now = datetime.datetime.now()
    if id == None:
        target = deadlines(user_id=user_id, course_id=course_id, date=date, created_at=date_now)
        db.session.add(target)
        db.session.commit()
        return "Deadline added succesfully!"
    elif isinstance(id, int):
        target_dl = db.session.query(deadlines).get(id)
        target_dl.date = date
        target_dl.created_at = date_now
        db.session.commit()
        return "Deadline changed succesfully!"
    else:
        return "Adding deadline was unsuccessful"

def check_existing_deadline_function(user_id, course_id):
    sql = "SELECT id FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
    result = db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
    for id in result:
        if id != None:
            return int(id[0])
        else:
            return None
        
def delete_deadline_permanently_function(user_id, course_id):
    try:
        sql = "DELETE FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        return "Course deadline deleted succesfully!"
    except:
        return "Deleting course deadline was unsuccesful"