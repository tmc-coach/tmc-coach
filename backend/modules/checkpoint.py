from app import db
from app.models import checkpoints
from sqlalchemy import text
import json
from datetime import timedelta
from sqlalchemy import text
import math


def count_checkpoint_dates(created_at, deadline, how_many_checkpoints, frequency=0, weekday=0):
    """Counts dates for the checkpoints.
        First, the days_between_checkpoints and the first checkpoint will be asigned and then
        the rest of the checkpoints. 

    Args:
        created_at (datetime): today
        deadline (datetime): date of the deadline
        how_many_checkpoints (int): the amount of checkpoints
        frequency (int): 1 = weekly checkpoints, 2 = monthly checkpoints, 3 = user has just chosen the amount of checkpoints
        weekday (string): the weekday, when the user wants to have their weekly checkpoints
            (Monday, tuesday, wednesday, thursday, friday, saturday or sunday)

    Returns:
        list of checkpoints
    """
    if (
        deadline < created_at + timedelta(days=how_many_checkpoints + 1)
        or how_many_checkpoints == 0
    ):
        return []

    checkpoints = []
    days_apart = deadline - created_at
    days_apart = days_apart.days - 1
    days_between_checkpoints = 0

    if frequency == 1:
        days_between_checkpoints = 7

        # Find the first wanted weekday after the created_at-date:
        for i in range(1, 8):
            day = created_at + timedelta(days=i)
            if day.weekday() == weekday - 1:
                if i < 4:
                    previous = day + timedelta(days=7)
                    how_many_checkpoints -= 1
                else:
                    previous = day
                break

        if previous + timedelta(days=(how_many_checkpoints * 7) + 3) < deadline:
            how_many_checkpoints += 1

    elif frequency == 2:
        days_between_checkpoints = 30
        previous = created_at + timedelta(days=30)

        if previous + timedelta(days=(how_many_checkpoints * 30) + 15) < deadline:
            how_many_checkpoints += 1

    else: # if frequency == 3:
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
    """Count how many exercise points should be done on every checkpoint

    Args:
        current_points (int): how many points the user has already done of the course
        target_points (int): how many points the user wants to get done of the course
        how_many_checkpoints (int): the amount of checkpoints

    Returns:
        list of checkpoints
    """
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
    frequency=0,
    weekday=0
):
    """Add the checkpoints to database

    Args:
        user_id (int): user's id
        course_id (int): course's id
        created_at (datetime): today
        deadline (datetime): date of the deadline
        how_many_checkpoints (int): the amount of checkpoints
        current_points (int): how many points the user has already done of the course
        target_points (int): how many points the user wants to get done of the course
        frequency (int): 1 = weekly checkpoints, 2 = monthly checkpoints, 3 = user has just chosen the amount of checkpoints
        weekday (string): the weekday, when the user wants to have their weekly checkpoints
            (Monday, tuesday, wednesday, thursday, friday, saturday or sunday)

    Returns:
        String that tell if the adding was succesful or not

    """
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
    """Get the checkpoints from the database

    Args:
        user_id (int): user's id
        course_id (int): course's id

    Returns:
        list of checkpoints
    """
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
    """Delete the existing checkpoints for the wanted course

    Args:
        user_id (int): user's id
        course_id (int): course's id

    Returns:
        String that tells if the deleteing was successful or not
    """
    try:
        sql = "DELETE FROM checkpoints WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        return "exisiting checkpoints for this course deleted succesfully"
    except:
        return "deleting existing checkpoints for this course was unsuccesful"


def get_checkpoint_infos(current_date):
    """Get the info of a checkpoints

    Args:
        current_date (datetime): today

    Returns:
        List of the info
    """
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
