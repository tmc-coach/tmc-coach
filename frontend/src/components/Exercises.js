import { Link } from 'react-router-dom'

const Exercises = ({ exercises, course_id }) => (
  <div key={exercises[0].course_id} className='w-full'>
    <h1>{exercises[0].course_title}</h1>
    {exercises[0].maximum_exercises > -1 ? (
      <>
        <div className='text-2xl font-medium pb-5'>
          Awarded points: {exercises[0].completed_percentage} %
        </div>
        <div className="w-full bg-gray-200 rounded">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1.5 leading-none rounded" style={{ width: `${ (exercises[0].completed_percentage < 5) ? 5 : exercises[0].completed_percentage }` + '%' }} >{exercises[0].completed_percentage} %</div>
        </div>
        <br></br>
        <div>
          <Link to={`/orgs/courses/${course_id}/set_deadline`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</Link>
        </div>
      </>
    ) : (
      <p>No exercises on this course</p>
    )}
  </div>
)

export default Exercises