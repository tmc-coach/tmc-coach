import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import courseService from '../services/course'
import settingService from '../services/settingDeadline'

import 'react-datepicker/dist/react-datepicker.css'

const SettingDeadline = () => {
  const course_id = useParams().id
  const [date, setDate] = useState(new Date())
  const [info, setInfo] = useState('')

  useEffect(() => {
    courseService.get_course_info(course_id).then(course => setInfo(course.course))
  }, [])

  const handleSetting = async (event) => {
    event.preventDefault()

    const now = new Date()
    console.log(now.getFullYear)
    console.log(date)

    const username = localStorage.getItem('loggedInUser')

    try {
      settingService.set_deadline({ course_id, username, date })
      console.log('nappia painettu')
    } catch (exception) {
      console.log('adding a deadline was unsuccesfull')
    }
  }

  return (
    <div>
      <p>Set deadline for course {info.title}</p>
      <p>Click the date to choose deadline for this course</p>
      <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} minDate={new Date()} />
      <button onClick={handleSetting}>Set deadline</button>
    </div>
  )
}

export default SettingDeadline