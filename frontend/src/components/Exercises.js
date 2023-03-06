import { Link } from 'react-router-dom'

const Exercises = ({ exercises, course_id }) => (
  <div>
    {exercises.map(exercise => (
      <div key={exercise.id}>
        <h1 className='text-3xl font-medium text-center tracking-wide p-10'>{exercise.course_title}</h1>
        {exercise.maximum_exercises > -1 ? (
          <>
            <div className='text-2xl font-medium'>
              Awarded points: {exercise.completed_percentage} %
            </div>
            <br></br>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${ (exercise.completed_percentage < 5) ? 5 : exercise.completed_percentage }` + '%' }} >{exercise.completed_percentage} %</div>
            </div>
            <br></br>
            <div>
              <Link to={`/orgs/courses/${course_id}/set_deadline`}>Set deadline</Link>
            </div>
          </>
        ) : (
          <p>No exercises on this course</p>
        )}
      </div>
    ))}
  </div>
)

export default Exercises