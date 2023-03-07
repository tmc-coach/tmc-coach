from app import db
from sqlalchemy.sql import text
import json
import datetime


def get_deadlines_function(user_id):
    sql = "SELECT * FROM deadlines WHERE user_id=:user_id"
    result = db.session.execute(text(sql), {"user_id":user_id})
    deadlines = result.fetchall() 
    response = {}
    for i in range(len(deadlines)):
        response[i] = {"id": deadlines[i][0], "user_id": deadlines[i][1], "course_id": deadlines[i][2], "date": deadlines[i][3], "created_at": deadlines[i][4]}
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