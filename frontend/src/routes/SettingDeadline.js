import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import courseService from '../services/course'
import settingService from '../services/settingDeadline'
import DeadlineSetting from '../components/DeadlineSetting'
import deadlineService from '../services/gettingDeadlines'
import Deadlines from '../components/Deadlines'

const SettingDeadline = () => {
  const [message, setMessage] = useState('')
  const course_id = useParams().id
  const [date, setDate] = useState(new Date())
  const [info, setInfo] = useState('')
  const [deadlines, setDeadlines] = useState([])

  const username = localStorage.getItem('loggedInUser')

  useEffect(() => {
    courseService.get_course_info(course_id).then(course => setInfo(course.course))
    deadlineService.get_deadlines({ username }).then(deadlines => setDeadlines(deadlines))
  }, [])

  const handleSetting = async (event) => {
    event.preventDefault()

    const username = localStorage.getItem('loggedInUser')

    try {
      settingService.set_deadline({ course_id, username, date })
      deadlineService.get_deadlines({ username }).then(dls => setDeadlines(dls))
      setMessage('Setting deadline was successful!')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    } catch (exception) {
      setMessage('adding a deadline was unsuccessful')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }
  useEffect(() => {
    deadlineService.get_deadlines({ username }).then(deadlines => setDeadlines(deadlines))
  }, [handleSetting])

  return (
    <div>
      <h1 className='text-3xl font-medium text-center tracking-wide p-10'>Set deadline for course {info.title}</h1>
      {message}
      <Deadlines deadlines={deadlines} course_id={course_id} />
      <DeadlineSetting date={date} setDate={setDate} handleSetting={handleSetting} />
    </div>
  )
}

export default SettingDeadline