from database_functions.checkpoint_functions import get_checkpoint_infos
import requests
from datetime import datetime
def check_points():
    current_date = datetime.now().date()
    current_date = "2023-04-04"
    results = get_checkpoint_infos(current_date)
    print("sähköpostia varten:")
    for result in results: 
        token = result[1]
        user_id = result[2]
        target_points = result[4]
        course_id = result[5]
        email = result[0]
        checkpoint_percent = result[3]
        deadline = result[6]
        current_points = len(current_points_from_api(course_id, token, user_id))
        late = False
        if current_points < target_points:
            late = True
        print({"email": email, "course_id": course_id, "checkpoint_percent": checkpoint_percent,
               "current_points": current_points, "target_points": target_points,
               "course_deadline": deadline, "late": late})
def current_points_from_api(course_id, token, user_id):
    points = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/users/{user_id}/points"
    )
    return points.json()
    
