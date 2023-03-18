import { Link } from 'react-router-dom'

const Courses = ({ courses }) => (

  <div>
    {courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(course =>
        <div key={course.id}>
          {course.name !== -1 ? (
            <Link to={`/orgs/courses/${course.id}`} className='flex flex-col bg-white border border-gray-400 p-5 my-5 rounded hover:bg-stone-100 text-left hover:shadow-sm hover:shadow-gray-800'>
              <div className='flex'>
                <div className='col-md-12'>
                  <div className='text-2xl font-medium pb-2'>
                    {course.title}
                    <span className='text-lg font-normal text-gray-500 ml-2'>
                    ({course.name})
                    </span>
                  </div>
                  <div className='text-base font-normal'>
                    {course.description !== '' ? course.description : 'A mysterious course without description.'}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p>No available courses</p>
          )}
        </div>
      )}
  </div>
)

export default Courses