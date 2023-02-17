const Exercises = ({ exercises }) => (

  <div>
    {exercises
      .map(exercises =>
        <div key={exercises}>
          <h1 className='text-3xl font-medium text-center tracking-wide p-10'>{exercises.course_title}</h1>
          <div className='text-2xl font-medium'>
            Exercises total: {exercises.awarded_points} / {exercises.maximum_exercises}
          </div>
        </div>
      )}
  </div>
)

export default Exercises