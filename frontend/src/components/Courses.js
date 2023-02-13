const Courses = ({ courses }) => (

  <div>
    {courses.sort((a, b) => a.name.localeCompare(b.name))
      .map(course => <div key={course.id}>
        {course.name}
      </div>)}
  </div>
)

export default Courses