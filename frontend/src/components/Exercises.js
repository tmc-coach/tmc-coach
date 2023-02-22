const Exercises = ({ exercises }) => (

  <div>
    {exercises.map(exercise => (
      <div key={exercise.id}>
        <h1 className='text-3xl font-medium text-center tracking-wide p-10'>{exercise.course_title}</h1>
        {exercise.maximum_exercises > -1 ? (
          <>
            <div className='text-2xl font-medium'>
              Awarded points: {exercise.completed_percentage} %
            </div>
            <h3>Total completed exercises from the course: {exercise.awarded_points} / {exercise.maximum_exercises}</h3>
          </>
        ) : (
          <p>No exercises on this course</p>
        )}
      </div>
    ))}
  </div>
)

export default Exercises