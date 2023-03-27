from app import db
from app.models import deadlines
from sqlalchemy import text
import json
import datetime
from database_functions.checkpoint_functions import (
    set_checkpoints_function,
    deleting_existing_checkpoints_for_course,
)


def get_deadline_function(user_id, course_id):
    deadline = deadlines.query.filter_by(user_id=user_id, course_id=course_id).all()

    if not deadline:
        return json.dumps([], default=str)

    deadline = deadline[0]

    response = {
        "id": deadline.id,
        "user_id": deadline.user_id,
        "course_id": deadline.course_id,
        "date": deadline.date,
    }

    return json.dumps(response, default=str)


def get_deadlines_function(user_id):
    deadlines_from_database = deadlines.query.filter_by(user_id=user_id).all()
    response = {}

    for i in range(len(deadlines_from_database)):
        response[i] = {
            "id": deadlines_from_database[i].id,
            "user_id": deadlines_from_database[i].user_id,
            "course_id": deadlines_from_database[i].course_id,
            "date": deadlines_from_database[i].date,
            "created_at": deadlines_from_database[i].created_at,
        }
    return json.dumps(response, default=str)


def set_deadline_function(user_id, date, course_id):
    id = check_existing_deadline_function(user_id, course_id)
    date_now = datetime.datetime.now()
    deadline_as_list = date.split("/")
    deadline_as_date = datetime.date(
        int(deadline_as_list[2]), int(deadline_as_list[1]), int(deadline_as_list[0])
    )
    if id == None:
        target = deadlines(
            user_id=user_id, course_id=course_id, date=deadline_as_date, created_at=date_now
        )
        db.session.add(target)
        set_checkpoints_function(
            user_id, course_id, datetime.datetime.now().date(), deadline_as_date, 3
        )
        db.session.commit()
        return "Deadline added succesfully!"
    elif isinstance(id, int):
        target_dl = db.session.get(deadlines, id)
        target_dl.date = deadline_as_date
        target_dl.created_at = date_now
        deleting_existing_checkpoints_for_course(user_id, course_id)
        set_checkpoints_function(
            user_id, course_id, datetime.datetime.now().date(), deadline_as_date, 3
        )
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
        deleting_existing_checkpoints_for_course(user_id, course_id)
        db.session.commit()
        return "Course deadline deleted succesfully!"
    except:
        return "Deleting course deadline was unsuccessful"
