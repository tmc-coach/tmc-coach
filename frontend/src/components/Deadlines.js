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

    console.log(date)

    let created_at = new Date()
    //created_at.setHours(12)
    //created_at.setMinutes(0)
    //created_at.setSeconds(0)
    //created_at.setMilliseconds(0)

    console.log(created_at)

    const days_between = Math.floor((date - created_at) / (1000 * 60 * 60 *24))

    let text = ''
    if (days_between < 4) {
      text = 'Why do you want to set a deadline that is under four days away??? Go do your exercises!!! No checkpoints will be asigned if you set the deadline under four days away from this day. Are you sure you want to set this deadline?'
      if (confirm(text) === false) {
        return
      }
    }

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