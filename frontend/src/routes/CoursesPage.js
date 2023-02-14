import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Courses from '../components/Courses'
import courseService from '../services/courses'
import Filter from '../components/Filter'

const Courses_Page = () => {

  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('')

  const org_slug = useParams().slug

  useEffect(() => {
    courseService.get_courses(org_slug).then(courses => setCourses(courses))
  }, [])

  const coursesToShow = (filter.length === 0) ? courses : courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col w-100 max-w-screen-lg'>
        <h1 className='text-3xl font-medium text-center tracking-wide p-10'>Courses</h1>
        {courses.length >= 2 && <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />}
        {courses.length > 0 ? <Courses courses={coursesToShow} /> : 'No available courses'}
      </div>
    </div>
  )

}

export default Courses_Page