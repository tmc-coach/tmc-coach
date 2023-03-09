from app import db


class deadlines(db.Model):
    __tablename__ = "deadlines"
    __table_args__ = {"extend_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"deadlines('{self.date}')"
