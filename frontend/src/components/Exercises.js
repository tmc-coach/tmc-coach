import Deadlines from './Deadlines'
import warning from '../assets/warning.png'

const Exercises = ({ exercises, course_id }) => (

  <div key={exercises[0].course_id} className='w-full'>
    <h1>{exercises[0].course_title}</h1>
    {exercises[0].disabled_status === 'enabled' ? (
      <>
        {exercises[0].maximum_exercises > -1 ? (
          <>
            <div className='text-2xl font-medium pb-5'>
              Awarded points: {exercises[0].completed_percentage} %
            </div>
            <div className="w-full bg-gray-200 rounded-full max-w-2xl mx-auto">
              <div className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-1.5 leading-none rounded-full" style={{ width: `${(exercises[0].completed_percentage < 5) ? 5 : exercises[0].completed_percentage}` + '%' }} >{exercises[0].completed_percentage} %</div>
            </div>
            <Deadlines course_id={course_id} />
          </>
        ) : (
          <p>No exercises on this course</p>
        )}
      </>
    ) : (
      <div className='border rounded border-b border-red-600 text-red-700 text-left px-4 py-3'>
        <div className='flex items-center'>
          <img className='h-8'src={warning} alt="" />
          <h1 className='p-2'>This course is disabled</h1>
        </div>
        <p>It is not possible to set a deadline for this course while it is disabled. The course is also hidden from the course list</p>
      </div>
    )}
  </div>
)

export default Exercises