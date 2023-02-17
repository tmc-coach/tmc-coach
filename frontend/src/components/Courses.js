import { Link } from 'react-router-dom'

const Courses = ({ courses }) => (

  <div>
    {courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(course =>
        <div key={course.id} className='border-black p-5 m-5 border rounded mx-10'>
          <div className='text-2xl font-medium'>
            {course.title}
          </div>
          <div>
            {course.description !== '' ? course.description : 'A mysterious course without description.'}
          </div>
          <div>
            <Link to={`/orgs/${course.name}/set_deadline`}>Set deadline</Link>
          </div>
        </div>)}
  </div>
)

export default Courses