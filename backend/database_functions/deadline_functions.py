from app import db
from sqlalchemy.sql import text
import json
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

class deadlines(db.Model):
    __tablename__ = 'deadlines'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"