const Deadlines = ({ deadlines, onDelete }) => {
  if (deadlines.length === 0) {
    return (
      <div>
        <p className="flex justify-center px-5 m-5">No deadlines chosen for this course</p>
      </div>
    )
  }

  return (
    <div>
      <p className="flex justify-center px-5 m-5 text-2xl font-medium">Deadline chosen for this course:</p>
      <div key={deadlines.id} className="flex justify-center px-5 m-5">
        {deadlines.date}
      </div>
      <div className="flex justify-center px-5 m-5">
        <button onClick={onDelete} value="delete_deadline" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete deadline</button>
      </div>
    </div>
  )
}

export default Deadlines