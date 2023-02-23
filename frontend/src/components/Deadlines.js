const Deadlines = ({ deadlines, course_id }) => {
  let deadlinesToShow = []
  for (const index in deadlines) {
    if (deadlines[index].course_id === parseInt(course_id)) {
      deadlinesToShow.push(deadlines[index])
    }
  }
  if (deadlinesToShow.length === 0) {
    return (
      <div>
        <p className="flex justify-center px-5 m-5">No deadlines chosen for this course</p>
      </div>
    )
  }
  return (
    <div>
      <p className="flex justify-center px-5 m-5">Deadlines chosen for this course</p>
      {deadlinesToShow
        .map(deadline =>
          <div key={deadline.id} className="flex justify-center px-5 m-5">
            {deadline.date}
          </div>
        )
      }
    </div>
  )
}

export default Deadlines