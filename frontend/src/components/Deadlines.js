import React, { useState, useEffect } from 'react'
import deadlineService from '../services/deadlines'

import SetDeadline from './SetDeadline'
import Deadline from './Deadline'

const Deadlines = ({ course_id }) => {
  const [date, setDate] = useState(new Date())
  //const [course, setCourse] = useState('')
  const [deadlines, setDeadlines] = useState([])
  const [newDeadlineAdded, setNewDeadline] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    deadlineService.get_deadline(course_id).then(deadlines => setDeadlines(deadlines))
  }, [])

  useEffect(() => {
    if (newDeadlineAdded) {
      deadlineService.get_deadline(course_id).then(deadlines => setDeadlines(deadlines))
      setNewDeadline(false)
    }
  }, [newDeadlineAdded])

  const handleSetDeadline = async (event) => {
    event.preventDefault()

    try {
      deadlineService.set_deadline({ course_id, date })
      setNewDeadline(true)
      setMessage('Deadline was set successfully')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    } catch (exception) {
      setMessage('Deadline could not be set')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }

  return (
    <div>
      <Deadline deadlines={deadlines} onChange={handleSetDeadline} />
      <SetDeadline deadlines={deadlines} date={date} setDate={setDate} handleSetDeadline={handleSetDeadline} message={message} />
    </div>
  )
}

export default Deadlines