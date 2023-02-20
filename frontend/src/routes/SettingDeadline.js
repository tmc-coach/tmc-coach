import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import courseService from '../services/course'
import settingService from '../services/settingDeadline'
import DeadlineSetting from '../components/DeadlineSetting'
import deadlineService from '../services/gettingDeadlines'
import Deadlines from '../components/Deadlines'

const SettingDeadline = () => {
  const course_id = useParams().id
  const [date, setDate] = useState(new Date())
  const [info, setInfo] = useState('')
  const [deadlines, setDeadlines] = useState([])

  const username = localStorage.getItem('loggedInUser')
  console.log(parseInt(course_id))

  useEffect(() => {
    courseService.get_course_info(course_id).then(course => setInfo(course.course))
  }, [])

  useEffect(() => {
    //deadlineService.get_deadlines({ username }).then(deadline => { if (parseInt(deadline.course_id) === parseInt(course_id)) { setDeadlines(deadlines.concat(deadline))}})
    deadlineService.get_deadlines({ username }).then(deadlines => setDeadlines(deadlines))
  }, [])

  const handleSetting = async (event) => {
    event.preventDefault()
    console.log(date)

    const username = localStorage.getItem('loggedInUser')

    try {
      settingService.set_deadline({ course_id, username, date })
      console.log('setting deadline was successful')
    } catch (exception) {
      console.log('adding a deadline was unsuccessful')
    }
  }

  return (
    <div>
      <h1  className='text-3xl font-medium text-center tracking-wide p-10'>Set deadline for course {info.title}</h1>
      <div>

      </div>
      <Deadlines deadlines={deadlines} course_id={course_id} />
      <DeadlineSetting date={date} setDate={setDate} handleSetting={handleSetting} />
      <p>{console.log(deadlines)}</p>
    </div>
  )
}

export default SettingDeadline