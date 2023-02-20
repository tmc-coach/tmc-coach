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
        <p>No deadlines chosen for this course</p>
      </div>
    )
  }
  return (
    <div>
      <p>Deadlines chosen for this course</p>
      {deadlinesToShow
        .map(deadline =>
          <div key={deadline.id}>
            {deadline.date}
          </div>
        )
      }
    </div>
  )
}

export default Deadlines