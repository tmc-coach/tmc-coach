const Deadline = ({ deadlines, onDelete }) => {
  if (deadlines.length === 0) {
    return (
      <div>
        <p className="flex justify-center px-5 mt-5">You have not set a deadline for this course</p>
      </div>
    )
  }

  return (
    <div>
      <p key={deadlines.id} className="flex justify-center px-5 m-5">You have planned to complete this course by {deadlines.date}</p>
      <div className="flex justify-center px-5 m-5">
        <button onClick={onDelete} value="delete_deadline" className="bg-red-600 hover:bg-red-700 text-white font-bold py-0.5 px-3 rounded">Delete deadline</button>
      </div>
    </div>
  )
}

export default Deadline