import React, { useState, useEffect } from 'react'
import deadlineService from '../services/deadlines'
import SetDeadline from './SetDeadline'
import Deadline from './Deadline'

const Deadlines = ({ course_id, exercises }) => {
  const [date, setDate] = useState(new Date())
  const [deadlines, setDeadlines] = useState([])
  const [newDeadlineAdded, setNewDeadline] = useState(false)
  const [message, setMessage] = useState(null)
  const [checkpoints, setCheckpoints] = useState(3)
  const [frequency, setFrequency] = useState(1)
  const [target_points, setTarget_points] = useState(exercises[0].maximum_exercises)
  const [weekday, setWeekday] = useState(1)

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

    if (frequency === 0) {
      alert('Please choose how often you want checkpoints')
      return
    }

    if (frequency === 1 && days_between < 13) {
      alert('You cannot have checkpoints weekly if the deadline is not at least 14 days away. Your chosen deadline is now ' + JSON.stringify(days_between + 1) + ' days away.')
      return
    }

    if (frequency === 2 && days_between < 59) {
      alert('You cannot have checkpoints monthly if the deadline is not at least 60 days away. Your chosen deadline is now ' + JSON.stringify(days_between + 1) + ' days away.')
      return
    }

    if (frequency === 1 && days_between > 182) {
      alert('You can not have weekly checkpoints if the deadline is over 26 weeks away')
      return
    }
    if (frequency === 2 && days_between > 720) {
      alert('You can not have monthly checkpoints if the deadline is over 24 months away')
      return
    }

    if (frequency === 1 && weekday === 0) {
      alert('Please choose a weekday when you want to have your weekly checkpoints')
      return
    }

    let amount_of_checkpoints = 0

    if (frequency === 1) {
      amount_of_checkpoints = Math.round(days_between / 7) - 1
    }

    if (frequency === 2) {
      amount_of_checkpoints = Math.round(days_between / 31) - 1
    }

    let text = ''
    if (days_between < 1) {
      text = 'Why do you want to set a deadline that is under two days away??? Go do your exercises!!! No checkpoints will be assigned if you set the deadline under 2 days away from this day. Are you sure you want to set this deadline?' + '\n' + '\n'
      if (deadlines.length === 0) {
        if (window.confirm(text) === false) {
          return
        }
      }
    }

    if (days_between < checkpoints && days_between > 0) {
      text = 'You are trying to have more checkpoints than there are days between today and the deadline. No checkpoints will be assigned if you try to have more checkpoints than there are days till the deadline. Are you sure you want to set this deadline?' + '\n' + '\n'
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
      if (frequency < 3) {
        let checkpoints = amount_of_checkpoints
        await deadlineService.set_deadline({ course_id, date, checkpoints, target_points, weekday, frequency })
      } else {
        await deadlineService.set_deadline({ course_id, date, checkpoints, target_points, weekday, frequency })
      }
      setNewDeadline(true)
      setMessage('Deadline set successfully!')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    } catch (exception) {
      setMessage('Deadline could not be set.')
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
        setMessage('Deadline deleted successfully.')
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
    <div className='flex flex-wrap justify-center'>
      {deadlines.length !== 0 && <Deadline deadlines={deadlines} onChange={handleSetDeadline} onDelete={handleDelete} />}
      <SetDeadline deadlines={deadlines} date={date} setDate={setDate} handleSetDeadline={handleSetDeadline} message={message} checkpoints={checkpoints} setCheckpoints={setCheckpoints} frequency={frequency} setFrequency={setFrequency} weekday={weekday} setWeekday={setWeekday} target_points={target_points} setTarget_points={setTarget_points} exercises={exercises}/>
    </div>
  )
}

export default Deadlines