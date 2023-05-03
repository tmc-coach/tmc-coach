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
    """Checks the id from the deadlines database to see if the user has already
    deadline added to the course.

    Args:
        user_id: user id
        course_id: course id

    Returns:
        If the user already has a deadline for the course, it will return the id of the
        deadline. If there is no deadline added, returns None. This will determine
        the way a new deadline will be added to the databases.
    """

    sql = "SELECT id FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
    result = db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
    for id in result:
        if id != None:
            return int(id[0])
        else:
            return None


def get_course_deadline(user_id, course_id):
    """Searches the data from the deadlines database by giving the user id and
    course id.

    Returns:
        If the user has a deadline for the wanted course, the function will return the
        data from the database. If the user doesn't have a deadline, the function will
        return an empty list.
    """

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


def get_points_for_deadline(exercises):
    """By giving exercises data, the function will count the user's current points
    from the course exercises and count the course maximum points.

    Returns:
        Information about the user's current points in the course and maximum points.
    """

    current_points = 0
    maximum_points = 0

    for item in exercises:
        maximum_points += len(item["available_points"])
        current_points += len(item["awarded_points"])

    return {"current_points": current_points, "target_points": maximum_points}


def set_deadline(
    user_id,
    date,
    course_id,
    exercises,
    checkpoints,
    target_points=None,
    frequency=0,
    weekday=0,
):
    """Sets deadline and checkpoints for the course, and adds them to the databases
    by calling other functions.

    Args:
        user_id: user id
        date: final date for the course
        course_id: course id
        exercises: all of the exercises data that includes info about the available
        points from the course.
        checkpoints: the number of checkpoints
        target_points: default as None
        frequency (int): 1 = weekly checkpoints, 2 = monthly checkpoints, 3 = user has just chosen the amount of checkpoints
        weekday (string): the weekday, when the user wants to have their weekly checkpoints
            (Monday, tuesday, wednesday, thursday, friday, saturday or sunday)

    Returns:
        Information regarding saving the deadline to the database.
    """

    id = check_existing_deadline(user_id, course_id)

    points_for_deadline = get_points_for_deadline(exercises)
    current_points = points_for_deadline["current_points"]

    if target_points == None:
        target_points = points_for_deadline["target_points"]
    if target_points > points_for_deadline["target_points"]:
        return "Adding deadline was unsuccessful"
    if target_points < points_for_deadline["current_points"]:
        return "Adding deadline was unsuccessful"

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
            weekday,
        )
        db.session.commit()
        return "Deadline added succesfully!"
    elif isinstance(id, int):
        target_dl = db.session.get(deadlines, id)
        target_dl.date = deadline_as_date
        target_dl.created_at = date_now
        target_dl.current_points = current_points
        target_dl.target_points = target_points
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
            weekday,
        )
        db.session.commit()
        return "Deadline changed succesfully!"
    else:
        return "Adding deadline was unsuccessful"


def delete_deadline(user_id, course_id):
    """Deletes the deadline from the deadlines database based on the given user
    id and course id. Also calls a function that will delete checkpoints from
    the checkpoints database.

    Returns:
        Information regarding deleting the deadline successfully from the database.
    """

    try:
        sql = "DELETE FROM deadlines WHERE user_id=:user_id AND course_id=:course_id"
        db.session.execute(text(sql), {"user_id": user_id, "course_id": course_id})
        deleting_existing_checkpoints_for_course(user_id, course_id)
        db.session.commit()
        return "Course deadline deleted succesfully!"
    except:
        return "Deleting course deadline was unsuccessful"


def get_deadline_infos(current_date):
    query = """SELECT
                u.email,
                u.token,
                u.id,
                d.target_points,
                d.course_id,
                d.date
                FROM
                users u
                INNER JOIN
                deadlines d
                ON
                u.id = d.user_id
                WHERE
                d.date =:current_date
            """
    results = db.session.execute(text(query), {"current_date": current_date}).fetchall()
    if results is None:
        return None
    return results
