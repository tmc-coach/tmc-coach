import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import courseService from '../services/courses'

import DeadlineSetting from '../components/DeadlineSetting'
import deadlineService from '../services/deadlines'
import Deadlines from '../components/Deadlines'

const SettingDeadline = () => {
  const [message, setMessage] = useState('')
  const course_id = useParams().id
  const [date, setDate] = useState(new Date())
  const [info, setInfo] = useState('')
  const [deadlines, setDeadlines] = useState([])
  const [newDeadlineAdded, setNew] = useState(false)

  useEffect(() => {
    courseService.get_course_info(course_id).then(course => setInfo(course.course))
    deadlineService.get_deadline(course_id).then(deadlines => setDeadlines(deadlines))
  }, [])

  useEffect(() => {
    if (newDeadlineAdded) {
      deadlineService.get_deadline(course_id).then(deadlines => setDeadlines(deadlines))
      setNew(false)
    }
  }, [newDeadlineAdded])


  const handleSetting = async (event) => {
    event.preventDefault()

    try {
      deadlineService.set_deadline({ course_id, date })
      setNew(true)
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

  return (
    <div className='main container container-fluid'>
      <h1>Set deadline for course {info.title}</h1>
      {message && <p className="flex justify-center my-5">{message}</p>}
      <Deadlines deadlines={deadlines} onChange={handleSetting} />
      <DeadlineSetting date={date} setDate={setDate} handleSetting={handleSetting} />
    </div>
  )
}

export default SettingDeadline