import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import courseService from '../services/course'

import 'react-datepicker/dist/react-datepicker.css'

const SettingDeadline = () => {
  const course_id = useParams().id
  const [date, setDate] = useState(new Date())
  const [course_info, setInfo] = useState([])

  useEffect(() => {
    courseService.get_course_info(course_id).then(course => setInfo(course))
  }, [])

  console.log(course_info.course.title)

  return (
    <div>
      <p>Set deadline for course {course_info.course.title}</p>
      <p>Click the date to choose deadline for this course</p>
      <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} />
      <button>Set deadline</button>
    </div>
  )
}

export default SettingDeadline