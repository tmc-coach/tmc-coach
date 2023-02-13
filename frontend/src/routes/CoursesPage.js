import { useState, useEffect } from 'react'
import Courses from '../components/Courses'
import courseService from '../services/courses'
import { useParams } from 'react-router-dom'

const Courses_Page = () => {

  const [courses, setCourses] = useState([])

  const org_slug = useParams().slug
  console.log('extracting slug')
  console.log(org_slug)

  useEffect(() => {
    courseService.get_courses(org_slug).then(courses => setCourses(courses))
  }, [])

  return (
    <div>
      hello
      <Courses courses={courses} />
    </div>
  )

}

export default Courses_Page