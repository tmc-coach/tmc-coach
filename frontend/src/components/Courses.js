import { Link } from 'react-router-dom'

const Courses = ({ courses }) => (

  <div>
    {courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(course =>
        <div key={course.id}>
          {course.name !== -1 ? (
            <Link to={`/orgs/courses/${course.id}`} className='flex flex-col border border-gray-400 p-5 m-5 rounded mx-10 hover:bg-stone-100 text-left hover:shadow-sm hover:shadow-gray-800'>
              <div className='flex'>
                <div className='text-2xl font-medium pb-1'>
                  {course.title}
                </div>
                <div className='text-lg font-normal text-gray-500 ml-2'>
                  ({course.name})
                </div>
              </div>
              <div className='text-base font-normal'>
                {course.description !== '' ? course.description : 'A mysterious course without description.'}
              </div>
            </Link>
          ) : (
            <p>No courses available</p>
          )}
        </div>
      )}
  </div>
)

export default Courses