import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Exercises from '../components/Exercises'
import exercisesService from '../services/exercises'

const ExercisesPage = () => {

  const [exercises, setExercises] = useState([])

  const course_id = useParams().course_id

  useEffect(() => {
    exercisesService.get_exercises(course_id).then(exercises => setExercises(exercises))
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col w-100 max-w-screen-lg'>
        {exercises.length > 0 ? <Exercises exercises={exercises} /> : 'Loading...'}
      </div>
    </div>
  )

}

export default ExercisesPage