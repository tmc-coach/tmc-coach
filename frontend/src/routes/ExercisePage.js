import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Exercises from '../components/Exercises'
//import exercisesService from '../services/exercises'
import courseService from '../services/courses'

const ExercisesPage = () => {

  const [exercises, setExercises] = useState([])

  const course_id = useParams().course_id

  useEffect(() => {
    courseService.get_exercises(course_id).then(exercises => setExercises(exercises))
  }, [])

  return (
    <div className='flex justify-center mx-5'>
      <div className='flex justify-center flex-col w-100 max-w-screen-lg text-center'>
        {exercises.length > 0 ? <Exercises exercises={exercises} course_id={course_id}/> : 'Loading...'}
      </div>
    </div>
  )

}

export default ExercisesPage