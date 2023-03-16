from app import db
from app.models import deadlines, checkpoints
import json
from datetime import *
import datetime

def get_deadlines_function(user_id):
    deadlines_from_database = deadlines.query.filter_by(user_id=user_id).all()
    response = {}
    print(deadlines_from_database[1])
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


def count_checkpoints(created_at, deadline, how_many_checkpoints):
    deadline_as_list = deadline.split('/')
    deadline_as_date = datetime.date(int(deadline_as_list[2]), int(deadline_as_list[1]), int(deadline_as_list[0]))

    if deadline_as_date < created_at + timedelta(days = how_many_checkpoints + 1):
        print("not good")
        return 

    days_apart = deadline_as_date - created_at
    days_apart = days_apart.days -1

    checkpoints = []

    previous = created_at
    print("kun checkpointeja on ")
    print(how_many_checkpoints)
    print("ja tämä päivä on ")
    print(created_at)
    print("ja asetettu deadline on ")
    print(deadline_as_date)
    print("ja tämän päivän ja deadlinen välissä on")
    print(days_apart)
    print("päivää, tulee checkpointit olemaan:")
    for i in range(how_many_checkpoints):
        percents = (100 // (how_many_checkpoints + 1)) * (i + 1)
        day = round(days_apart * (percents / 100))
        checkpoint_date = created_at + timedelta(days = day)
        if checkpoint_date == previous:
            checkpoint_date = checkpoint_date + timedelta(days = 1)
        previous = checkpoint_date
        print(checkpoint_date)
        checkpoints.append((checkpoint_date, percents))
    
    return checkpoints

    # Checkpointit pitäisi vielä tallentaa tietokantaan
def set_checkpoints_function(user_id, course_id, created_at, deadline, how_many_checkpoints):
    checkpoints = count_checkpoints(created_at, deadline, how_many_checkpoints)
    print(checkpoints)