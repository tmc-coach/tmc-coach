const Courses = ({ courses }) => (

  <div>
    {courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(course =>
        <div key={course.id} className='border-black p-5 m-5 border rounded mx-10'>
          <h4 className=''>
            {course.title}
          </h4>
          <br></br>
          {course.description !== '' ? course.description : 'A mysterious course without description.'}

        </div>)}
  </div>
)

export default Courses