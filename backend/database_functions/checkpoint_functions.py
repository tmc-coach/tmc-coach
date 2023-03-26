from app import db
from app.models import checkpoints
import json
from datetime import datetime, timedelta
from sqlalchemy import text
import math


def count_checkpoints(created_at, deadline, how_many_checkpoints):
    if deadline < created_at + timedelta(days=how_many_checkpoints + 1):
        return

    checkpoints = []
    days_apart = deadline - created_at
    days_apart = days_apart.days - 1
    days_between_checkpoints = 0

    if (days_apart / (how_many_checkpoints + 1)) % 0.5  == 0:
        days_between_checkpoints = math.ceil(days_apart / (how_many_checkpoints + 1))
    else:
        days_between_checkpoints = round(days_apart / (how_many_checkpoints + 1))

    if days_apart < (how_many_checkpoints * days_between_checkpoints) - 1:
        days_between_checkpoints -= 1

    between_the_1st_day_and_the_1st_checkpoint = math.ceil((days_apart - ((how_many_checkpoints - 1) * days_between_checkpoints)) / 2)
    previous = created_at + timedelta(days= between_the_1st_day_and_the_1st_checkpoint)

    for i in range(how_many_checkpoints):
        day = previous + timedelta(days=days_between_checkpoints)
        if i == 0:
            day = previous
        checkpoints.append(day)
        previous = day

    return checkpoints

def set_checkpoints_function(
    user_id, course_id, created_at, deadline, how_many_checkpoints
):
    checkpoints_list = count_checkpoints(created_at, deadline, how_many_checkpoints)
    try:
        for checkpoint in checkpoints_list:
            date = checkpoint[0]
            percent = checkpoint[1]
            target = checkpoints(
                user_id=user_id,
                course_id=course_id,
                checkpoint_date=date,
                checkpoint_percent=percent,
            )
            db.session.add(target)
        return "Checkpoints added to the database successfully"
    except:
        return "Adding checkpoints to the database was unsuccessful"


def get_checkpoints_function(user_id, course_id):
    checkpoints_from_database = checkpoints.query.filter_by(
        user_id=user_id, course_id=course_id
    ).all()
    response = {}
    for i in range(len(checkpoints_from_database)):
        response[i] = {
            "id": checkpoints_from_database[i].id,
            "user_id": checkpoints_from_database[i].user_id,
            "course_id": checkpoints_from_database[i].course_id,
            "checkpoint_date": checkpoints_from_database[i].checkpoint_date,
            "checkpoint_percent": checkpoints_from_database[i].checkpoint_percent,
        }
    return json.dumps(response, default=str)


def deleting_existing_checkpoints_for_course(user_id, course_id):
    try:
        sql = "DELETE FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        return "exisiting checkpoints for this course deleted succesfully"
    except:
        return "deleting existing checkpoints for this course was unsuccesful"
