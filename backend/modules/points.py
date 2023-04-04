from database_functions.checkpoint_functions import get_checkpoint_infos
import requests
from datetime import datetime
def check_points():
    current_date = datetime.now().date()
    # current_date = "2023-04-04"
    results = get_checkpoint_infos(current_date)
    print("sähköpostia varten:")
    for result in results: 
        user_id = result[2]
        token = result[1]
        target_points = result[4]
        course_id = result[5]
        email = result[0]
        checkpoint_percent = result[3]
        deadline = result[6]
        current_points = len(current_points_from_api(course_id, user_id))
        course_name = course_name_from_api(course_id, token)
        on_schedule = True
        if current_points < target_points:
            on_schedule = False
        print({"email": email, "course_name": course_name, "checkpoint_percent": checkpoint_percent,
               "current_points": current_points, "target_points": target_points,
               "course_deadline": deadline, "on_schedule": on_schedule})
        
def current_points_from_api(course_id, user_id):
    points = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}/users/{user_id}/points"
    )
    return points.json()

def course_name_from_api(course_id, token):
    course_info = requests.get(
        f"https://tmc.mooc.fi/api/v8/courses/{course_id}",
        headers={"Accept": "application/json", "Authorization": token},
    )
    course_info = course_info.json()
    return course_info["title"]

