from app import db
from sqlalchemy.sql import text
import json

def get_deadlines_function(username):
    sql = "SELECT * FROM deadlines WHERE username=:username"
    result = db.session.execute(text(sql), {"username":username})
    deadlines = result.fetchall() 
    response = {}
    for i in range(len(deadlines)):
        response[i] = {"id": deadlines[i][0], "username": deadlines[i][1], "course_id": deadlines[i][2], "date": deadlines[i][3]}
    return json.dumps(response, default=str)