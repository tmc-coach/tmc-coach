from flask import Blueprint, jsonify, request
from modules.user import encode_jwt, decode_jwt
from app import db
from sqlalchemy.sql import text
import json
import datetime

def set_deadline(username, date, course_id):
    date_now = datetime.datetime.now()
    target = deadlines(username=username, course_id=course_id, date=date, created_at=date_now)
    db.session.add(target)
    #sql = "INSERT INTO deadlines (username, course_id, date) VALUES (:username, :course_id, :date)"
    #db.session.execute(text(sql), {"username":username, "course_id":course_id, "date":date})
    db.session.commit()
    return jsonify(message="Deadline added succesfully!")

class deadlines(db.Model):
    __tablename__ = 'deadlines'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"