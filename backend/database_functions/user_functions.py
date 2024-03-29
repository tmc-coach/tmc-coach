from app import db
from app.models import users, deadlines
from sqlalchemy import text


def set_user(id: int, token: str, email: str) -> str:
    """Set user details to database.
        If user is not in database, new record is created.
        If user is in database, token is updated if needed.

    Args:
        id (int): User id
        token (str): Token
        email (str): Email address

    Returns:
        str: Description of update
    """

    sql = "SELECT token, email FROM users WHERE id=:id"
    result = db.session.execute(text(sql), {"id": id}).first()
    if result == None:
        target = users(id=id, token=token, email=email)
        db.session.add(target)
        db.session.commit()
        return "User row created"
    elif result[0] != token:
        sql = "UPDATE users SET token=:token, email=:email WHERE id=:id"
        db.session.execute(text(sql), {"token": token, "email": email, "id": id})
        db.session.commit()
        return "Token updated"
    return "Something else happened"


def delete_user(id: int) -> str:
    """Deletes user from the database."""

    sql = "DELETE FROM users WHERE id=:id"
    db.session.execute(text(sql), {"id": id})
    db.session.commit()
    return "User deleted"


def get_user_email(user_id):
    """Fetchs user's information from users-database and deadlines-database.

    Args:
        user_id: User id

    Returns:
        Dictionary with user id, user email, course id's, and based on course id,
        it will return course titles.
    """

    user = users.query.filter_by(id=user_id).first()
    user_deadlines = deadlines.query.filter_by(user_id=user_id).all()

    response = {"id": user.id, "user_email": user.email, "courses": [], "titles": []}

    for course in user_deadlines:
        response["courses"].append({"course_id": course.course_id})

    return response
