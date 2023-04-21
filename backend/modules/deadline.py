from app import db
from app.models import deadlines
from sqlalchemy import text
import json
import datetime
from modules.checkpoint import (
    set_checkpoints,
    deleting_existing_checkpoints_for_course,
)


def check_existing_deadline(user_id, course_id):
    sql = "SELECT id FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
    result = db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
    for id in result:
        if id != None:
            return int(id[0])
        else:
            return None


def get_course_deadline(user_id, course_id):
    deadline = deadlines.query.filter_by(user_id=user_id, course_id=course_id).all()

    if not deadline:
        return json.dumps([], default=str)

    deadline = deadline[0]

    response = {
        "id": deadline.id,
        "user_id": deadline.user_id,
        "course_id": deadline.course_id,
        "date": deadline.date,
        "created_at": deadline.created_at,
        "current_points": deadline.current_points,
        "target_points": deadline.target_points,
    }

    return json.dumps(response, default=str)


def get_deadlines(user_id):
    deadlines_from_database = deadlines.query.filter_by(user_id=user_id).all()
    response = {}

    for i in range(len(deadlines_from_database)):
        response[i] = {
            "id": deadlines_from_database[i].id,
            "user_id": deadlines_from_database[i].user_id,
            "course_id": deadlines_from_database[i].course_id,
            "date": deadlines_from_database[i].date,
            "created_at": deadlines_from_database[i].created_at,
            "current_points": deadlines_from_database[i].current_points,
            "target_points": deadlines_from_database[i].target_points,
        }
    return json.dumps(response, default=str)


def get_points_for_deadline(exercises):
    current_points = 0
    maximum_points = 0

    for item in exercises:
        maximum_points += len(item["available_points"])
        current_points += len(item["awarded_points"])

    return {"current_points": current_points, "target_points": maximum_points}


def set_deadline(user_id, date, course_id, exercises, checkpoints, frequency=0, weekday=0):
    id = check_existing_deadline(user_id, course_id)

    points_for_deadline = get_points_for_deadline(exercises)
    current_points = points_for_deadline["current_points"]
    target_points = points_for_deadline["target_points"]

    date_now = datetime.datetime.now()
    deadline_as_list = date.split("/")
    deadline_as_date = datetime.date(
        int(deadline_as_list[2]), int(deadline_as_list[1]), int(deadline_as_list[0])
    )
    if id == None:
        target = deadlines(
            user_id=user_id,
            course_id=course_id,
            date=deadline_as_date,
            created_at=date_now,
            current_points=current_points,
            target_points=target_points,
        )
        db.session.add(target)

        set_checkpoints(
            user_id,
            course_id,
            datetime.datetime.now().date(),
            deadline_as_date,
            checkpoints,
            current_points,
            target_points,
            frequency,
            weekday
        )
        db.session.commit()
        return "Deadline added succesfully!"
    elif isinstance(id, int):
        target_dl = db.session.get(deadlines, id)
        target_dl.date = deadline_as_date
        target_dl.created_at = date_now
        target_dl.current_points = current_points
        deleting_existing_checkpoints_for_course(user_id, course_id)
        set_checkpoints(
            user_id,
            course_id,
            datetime.datetime.now().date(),
            deadline_as_date,
            checkpoints,
            current_points,
            target_points,
            frequency,
            weekday
        )
        db.session.commit()
        return "Deadline changed succesfully!"
    else:
        return "Adding deadline was unsuccessful"


def delete_deadline(user_id, course_id):
    try:
        sql = "DELETE FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        deleting_existing_checkpoints_for_course(user_id, course_id)
        db.session.commit()
        return "Course deadline deleted succesfully!"
    except:
        return "Deleting course deadline was unsuccessful"
