import { useState, useEffect } from 'react'
import Courses from '../components/Courses'
import courseService from '../services/courses'
import { useParams } from 'react-router-dom'

const Courses_Page = () => {

  const [courses, setCourses] = useState([])

  const org_slug = useParams().slug

  useEffect(() => {
    courseService.get_courses(org_slug).then(courses => setCourses(courses))
  }, [])

  return (
    <div>
      <h1 className='text-3xl font-medium text-center tracking-wide p-10'>Courses</h1>
      <Courses courses={courses} />
    </div>
  )

}

export default Courses_Page