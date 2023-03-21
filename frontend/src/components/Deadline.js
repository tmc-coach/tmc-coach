const Deadline = ({ deadlines, onDelete }) => {
  if (deadlines.length === 0) {
    return (
      <p className="flex justify-center my-5">You have not set a deadline for this course</p>
    )
  }

  return (
    <>
      <p key={deadlines.id} className="flex justify-center px-5 m-5">You have planned to complete this course by {deadlines.date}</p>
      <div className="flex justify-center px-5 m-5">
        <button onClick={onDelete} value="delete_deadline" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">Delete deadline</button>
      </div>
    </>
  )
}

export default Deadline