import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import orgService from '../services/org'
import courseService from '../services/courses'
import Organization from '../components/Organization'
import Filter from '../components/Filter'
import Courses from '../components/Courses'

const Courses_Page = () => {

  const [org, setOrg] = useState({
    name: '',
    logo_path: '',
    information: ''
  })
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('')

  const org_slug = useParams().slug

  useEffect(() => {
    orgService.get_org(org_slug).then(org => setOrg({ ...org, name: org[0].name, information: org[0].information, logo_path: org[0].logo_path }))
    console.log('returned org')
    console.log(org)
    courseService.get_courses(org_slug).then(courses => setCourses(courses))
    console.log('returned courses')
    console.log(courses)
  }, [])

  const coursesToShow = (filter.length === 0) ? courses : courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className='flex justify-center mx-5'>
      <div className='flex justify-center flex-col w-100 max-w-screen-lg text-center'>
        <Organization organization={org} />
        <h1 className='text-3xl font-medium text-center tracking-wide px-10 pb-10'>Courses</h1>
        {courses.length >= 2 && <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />}
        {courses.length > 0 ? <Courses courses={coursesToShow} /> : 'No available courses'}
      </div>
    </div>
  )

}

export default Courses_Page