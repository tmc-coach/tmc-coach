import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import orgService from '../services/org'
import Loading from '../components/Loading'
import Organization from '../components/Organization'
import Filter from '../components/Filter'
import Courses from '../components/Courses'
import ErrorBoundary from '../components/ErrorBoundary'

const Courses_Page = () => {

  const [org, setOrg] = useState([])
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('')
  const [failed, setFailed] = useState(false)

  const org_slug = useParams().slug

  useEffect(() => {
    orgService.get_org(org_slug).then(org => setOrg(org)).catch(() => setFailed(true))
    orgService.get_courses(org_slug).then(courses => setCourses(courses))
  }, [])

  const coursesToShow = (filter.length === 0) ? courses : courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()))
  if (failed) return <ErrorBoundary />

  return (
    <div className='flex justify-center mx-5'>
      {courses.length > 0 ? (<div className='flex justify-center flex-col w-100 max-w-screen-lg text-center'>
        <Organization organization={org} />
        <h1 className='text-3xl font-medium text-center tracking-wide px-10 pb-10'>Courses</h1>
        {courses.length >= 2 && <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />}
        <Courses courses={coursesToShow} />
      </div>) : (
        <Loading />
      )
      }
    </div>
  )
}

export default Courses_Page