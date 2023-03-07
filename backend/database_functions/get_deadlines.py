from app import db
from sqlalchemy.sql import text
import json

def get_deadlines_function(user_id):
    sql = "SELECT * FROM deadlines WHERE user_id=:user_id"
    result = db.session.execute(text(sql), {"user_id":user_id})
    deadlines = result.fetchall() 
    response = {}
    for i in range(len(deadlines)):
        response[i] = {"id": deadlines[i][0], "user_id": deadlines[i][1], "course_id": deadlines[i][2], "date": deadlines[i][3], "created_at": deadlines[i][4]}
    return json.dumps(response, default=str)