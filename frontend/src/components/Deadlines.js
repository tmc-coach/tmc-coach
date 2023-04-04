import React, { useState, useEffect } from 'react'
import deadlineService from '../services/deadlines'
import SetDeadline from './SetDeadline'
import Deadline from './Deadline'

const Deadlines = ({ course_id }) => {
  const [date, setDate] = useState(new Date())
  const [deadlines, setDeadlines] = useState([])
  const [newDeadlineAdded, setNewDeadline] = useState(false)
  const [message, setMessage] = useState(null)
  const [checkpoints, setCheckpoints] = useState(3)
  const [freqvency, setFreqvency] = useState(0)

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

    if (freqvency === 0) {
      alert('Please choose how often you want checkpoints')
      return
    }

    if (freqvency === 1 && days_between < 13) {
      alert('You cannot have checkpoints weekly if the deadline is not at least 14 days away. Your chosen deadline is now ' + JSON.stringify(days_between + 1) + ' days away.')
      return
    }

    if (freqvency === 2 && days_between < 59) {
      alert('You cannot have checkpoints monthly if the deadline is not at least 60 days away. Your chosen deadline is now ' + JSON.stringify(days_between + 1) + ' days away.')
      return
    }

    let amount_of_checkpoints = 0

    if (freqvency === 1) {
      amount_of_checkpoints = Math.round(days_between / 7) - 1
    }

    if (freqvency === 2) {
      amount_of_checkpoints = Math.round(days_between / 30) - 1
    }

    console.log(typeof(amount_of_checkpoints))

    let text = ''
    if (days_between < checkpoints) {
      text = 'Why do you want to set a deadline that is under four days away??? Go do your exercises!!! No checkpoints will be asigned if you set the deadline under four days away from this day. Are you sure you want to set this deadline?' + '\n' + '\n'
      if (deadlines.length === 0) {
        if (window.confirm(text) === false) {
          return
        }
      }
    }

    if (deadlines.length !== 0) {
      text = text + 'You have already set a deadline for this course.\nDo you want to set ' + JSON.stringify(date.getFullYear()) + '.' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getDate()) + ' as your new deadline for this course?'
      if (window.confirm(text) === false) {
        return
      }
    }

    try {
      if (freqvency < 3) {
        let checkpoints = amount_of_checkpoints
        await deadlineService.set_deadline({ course_id, date, checkpoints })
      } else {
        await deadlineService.set_deadline({ course_id, date, checkpoints })
      }
      setNewDeadline(true)
      window.location.reload()
      //setMessage('Deadline was set successfully!')
      //setTimeout(() => {
      //setMessage(null)
      //}, 10000)
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
        //setMessage('Deleting deadline was successful!')
        //setTimeout(() => {
        //setMessage(null)
        //}, 10000)
        setNewDeadline(true)
        window.location.reload()
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
      <SetDeadline deadlines={deadlines} date={date} setDate={setDate} handleSetDeadline={handleSetDeadline} message={message} checkpoints={checkpoints} setCheckpoints={setCheckpoints} freqvency={freqvency} setFreqvency={setFreqvency} />
    </>
  )
}

export default Deadlines