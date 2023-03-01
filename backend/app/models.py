from app import db

class deadlines(db.Model):
    __tablename__ = 'deadlines'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f"deadlines('{self.date}')"

# Database model demo
class TargetDate(db.Model):
    __tablename__ = "target_date"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    course = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"target_date('{self.date}')"