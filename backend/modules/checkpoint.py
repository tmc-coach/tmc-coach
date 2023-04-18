from app import db
from app.models import checkpoints
from sqlalchemy import text
import json
from datetime import timedelta
from sqlalchemy import text
import math


def count_checkpoint_dates(created_at, deadline, how_many_checkpoints, frequency, weekday):
    if (
        deadline < created_at + timedelta(days=how_many_checkpoints + 1)
        or how_many_checkpoints == 0
    ):
        return
    
    # jos käyttäjä on valinnut viikottaiset checkpointit,
    # days_between_checkpoints on 7.
    # previous on ensimmäinen halutun päivän checkpoint
    # how many checkpointsin voisi laskea uudestaan, jos on valinnut viikottaiset
    # checkpointit.

    checkpoints = []
    days_apart = deadline - created_at
    days_apart = days_apart.days - 1
    days_between_checkpoints = 0

    if frequency == 1:
        days_between_checkpoints = 7

        for i in range(1, 7):
            day = created_at + timedelta(days=i)
            if day.weekday() == weekday - 1:
                previous = day

        if previous + timedelta(days=how_many_checkpoints * 7) < deadline:
            how_many_checkpoints = how_many_checkpoints + 1

    else: # if freqvuency == 3:
        if (days_apart / (how_many_checkpoints + 1)) % 0.5 == 0:
            days_between_checkpoints = math.ceil(days_apart / (how_many_checkpoints + 1))
        else:
            days_between_checkpoints = round(days_apart / (how_many_checkpoints + 1))

        if days_apart < (how_many_checkpoints * days_between_checkpoints) - 1:
            days_between_checkpoints -= 1

        between_the_1st_day_and_the_1st_checkpoint = math.ceil(
            (days_apart - ((how_many_checkpoints - 1) * days_between_checkpoints)) / 2
        )
        previous = created_at + timedelta(days=between_the_1st_day_and_the_1st_checkpoint)

    for i in range(how_many_checkpoints):
        percents = (round(100 / (how_many_checkpoints + 1))) * (i + 1)
        checkpoint_date = previous + timedelta(days=days_between_checkpoints)
        if i == 0:
            checkpoint_date = previous
        checkpoints.append((checkpoint_date, percents))
        previous = checkpoint_date

    return checkpoints


def count_checkpoint_points(current_points, target_points, how_many_checkpoints):
    remaining_points = target_points - current_points
    desired_points_list = []
    for i in range(how_many_checkpoints):
        percents = (100 // (how_many_checkpoints + 1)) * (i + 1)
        points = remaining_points * (percents / 100)
        desired_points = current_points + points
        desired_points_list.append((percents, desired_points))

    return desired_points_list


def set_checkpoints(
    user_id,
    course_id,
    created_at,
    deadline,
    how_many_checkpoints,
    current_points,
    target_points,
    frequency,
    weekday
):
    checkpoint_dates_list = count_checkpoint_dates(
        created_at, deadline, how_many_checkpoints, frequency, weekday
    )
    checkpoint_points_list = count_checkpoint_points(
        current_points, target_points, len(checkpoint_dates_list) #how_many_checkpoints
    )

    try:
        for i in range(len(checkpoint_dates_list)):
            date = checkpoint_dates_list[i][0]
            percent = checkpoint_dates_list[i][1]
            desired_points = checkpoint_points_list[i][1]
            target = checkpoints(
                user_id=user_id,
                course_id=course_id,
                checkpoint_date=date,
                checkpoint_percent=percent,
                desired_points=desired_points,
            )
            db.session.add(target)
        return "Checkpoints added to the database successfully"
    except:
        return "Adding checkpoints to the database was unsuccessful"


def get_checkpoints(user_id, course_id):
    checkpoints_from_database = checkpoints.query.filter_by(
        user_id=user_id, course_id=course_id
    ).all()
    response = []
    for checkpoint in checkpoints_from_database:
        response.append(
            {
                "id": checkpoint.id,
                "user_id": checkpoint.user_id,
                "course_id": checkpoint.course_id,
                "checkpoint_date": checkpoint.checkpoint_date,
                "checkpoint_percent": checkpoint.checkpoint_percent,
                "desired_points": checkpoint.desired_points,
            }
        )

    return json.dumps(response, default=str)


def deleting_existing_checkpoints_for_course(user_id, course_id):
    try:
        sql = "DELETE FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        return "exisiting checkpoints for this course deleted succesfully"
    except:
        return "deleting existing checkpoints for this course was unsuccesful"


def get_checkpoint_infos(current_date):
    query = """SELECT
                u.email,
                u.token,
                u.id,
                c.checkpoint_percent,
                c.desired_points,
                c.course_id,
                d.date
                FROM
                users u
                INNER JOIN
                checkpoints c
                ON
                u.id = c.user_id
                INNER JOIN
                deadlines d
                ON
                u.id = d.user_id
                WHERE
                c.checkpoint_date =:current_date
            """
    results = db.session.execute(text(query), {"current_date": current_date}).fetchall()
    if results is None:
        return None
    return results
