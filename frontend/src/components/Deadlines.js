const Deadlines = ({ deadlines }) => {
  console.log(deadlines.length)

  if (deadlines.length === 0) {
    return (
      <div>
        <p className="flex justify-center px-5 m-5">No deadlines chosen for this course</p>
      </div>
    )
  }

  return (
    <div>
      <p className="flex justify-center px-5 m-5">Deadlines chosen for this course</p>
      <div key={deadlines.id} className="flex justify-center px-5 m-5">
        {deadlines.date}
      </div>
    </div>
  )
}

export default Deadlines