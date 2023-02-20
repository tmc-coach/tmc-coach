from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
import requests
from app import db
from sqlalchemy.sql import text

deadline = Blueprint("deadline", __name__)

@deadline.route("/set_deadline", methods=["POST"])
def set_deadline():
    username = request.json.get("username")
    date = request.json.get("date")
    course_id = request.json.get("course_id")
    target = deadlines(username=username, course_id=course_id, date=date)
    db.session.add(target)
    #sql = "INSERT INTO deadlines (username, course_id, date) VALUES (:username, :course_id, :date)"
    #db.session.execute(text(sql), {"username":username, "course_id":course_id, "date":date})
    db.session.commit()
    return jsonify(message="Deadline added succesfully!")

@deadline.route("/<username>", methods=["GET"])
def get_deadlines(username):
    sql = "SELECT * FROM deadlines WHERE username=:username"
    result = db.session.execute(text(sql), {"username":username})
    #sql = "SELECT * FROM deadlines WHERE course_id=:course_id"
    #result = db.session.execute(text(sql), {"course_id":course_id})
    print("TULOSTA")
    response = result.fetchall() 
    print(response)
    return response.json()

# Database model demo
class deadlines(db.Model):
    __tablename__ = 'deadlines'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"