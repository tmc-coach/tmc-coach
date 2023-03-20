from app import db


class deadlines(db.Model):
    __tablename__ = "deadlines"
    __table_args__ = {"extend_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    current_points = db.Column(db.Integer, nullable=False)
    available_points = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"deadlines('{self.date}')"
    
class checkpoints(db.Model):
    __tablename__ = "checkpoints"
    __table_args__ = {"extend_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    checkpoint_date = db.Column(db.DateTime, nullable=False)
    checkpoint_percent = db.Column(db.Integer, nullable=False)
    desired_points = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "checkpoint"

