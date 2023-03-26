import React, { useState, useEffect } from 'react'
import deadlineService from '../services/deadlines'
import SetDeadline from './SetDeadline'
import Deadline from './Deadline'

const Deadlines = ({ course_id }) => {
  const [date, setDate] = useState(new Date())
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

    let created_at = new Date()

    const days_between = Math.floor((date - created_at) / (1000 * 60 * 60 *24))

    let text = ''
    if (days_between < 3) {
      text = 'Why do you want to set a deadline that is under four days away??? Go do your exercises!!! No checkpoints will be asigned if you set the deadline under four days away from this day. Are you sure you want to set this deadline?' + '\n' + '\n'
      if (deadlines.length === 0) {
        if (window.confirm(text) === false) {
          return
        }
      }
    }

    //let text = ''
    if (deadlines.length !== 0) {
      text = text + 'You have already set a deadline for this course.\nDo you want to set ' + JSON.stringify(date.getFullYear()) + '.' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getDate()) + ' as your new deadline for this course?'
      if (window.confirm(text) === false) {
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

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm('Are you sure you want to delete the deadline you have set for this course?') === true) {
      try {
        await deadlineService.delete_deadline(course_id)
        setMessage('Deleting deadline was successful!')
        setTimeout(() => {
          setMessage(null)
        }, 10000)
        setNewDeadline(true)
      } catch (exception) {
        setMessage('Deleting deadline was unsuccessful. Please try again.')
        setTimeout(() => {
          setMessage(null)
        }, 10000)
      }
    }
  }

  return (
    <>
      <Deadline deadlines={deadlines} onChange={handleSetDeadline} onDelete={handleDelete} />
      <SetDeadline deadlines={deadlines} date={date} setDate={setDate} handleSetDeadline={handleSetDeadline} message={message} />
    </>
  )
}

export default Deadlines