const Deadline = ({ deadlines }) => {
  if (deadlines.length === 0) {
    return (
      <div>
        <p className="flex justify-center px-5 m-5">You have not set a deadline for this course</p>
      </div>
    )
  }

  return (
    <div>
      <p key={deadlines.id} className="flex justify-center px-5 m-5">You have planned to complete this course by {deadlines.date}</p>
    </div>
  )
}

export default Deadline