import { Link } from 'react-router-dom'

const Courses = ({ courses }) => (

  <div>
    {courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(course =>
        <div key={course.id}>
          <Link to={`/orgs/courses/${course.id}`} className='flex border-gray-300 p-5 m-5 border rounded mx-10 hover:bg-stone-100'>
            <div className='text-2xl font-medium'>
              {course.title}
            </div>
            <div className="flex-initial w-100 px-2"></div>
            <h2 className='text-lg font-medium'>{course.name}</h2>
            <div>
              {course.description !== '' ? course.description : 'A mysterious course without description.'}
            </div>
          </Link>
          <div>
            <Link to={`/orgs/courses/${course.id}/set_deadline`}>Set deadline</Link>
          </div>
        </div>
      )}
  </div>
)

export default Courses