import Checkpoints from './Checkpoints'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'

const Deadline = ({ deadlines, onDelete }) => {
  const [LoadingSpinner, setLoadingSpinner] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingSpinner(false)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const formatDate = (d) => {
    const date = new Date(d)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  if (deadlines.length === 0) {
    return (
      <div>
        {LoadingSpinner ? (
          <Loading />
        ) : (
          <p className="flex justify-center my-5 text-lg">You have not set a deadline for this course</p>
        )}
      </div>
    )
  }


  return (
    <div>
      {LoadingSpinner ? (
        <Loading />
      ) : (
        <div className="my-4 rounded-md border-solid border-4 border-black-800">
          <p key={deadlines.id} className="flex justify-center px-5 m-5 text-2xl">You have planned to complete {deadlines.target_points} points by {formatDate(deadlines.date.split(' ')[0])}</p>
          {deadlines.checkpoints && <Checkpoints deadlines={deadlines} />}
          <div className="flex justify-center px-5 m-5">
            <button onClick={onDelete} value="delete_deadline" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">Delete deadline</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Deadline
