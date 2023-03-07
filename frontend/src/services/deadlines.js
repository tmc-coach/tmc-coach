import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/deadline' : process.env.REACT_APP_BASEURL + '/deadline'

const get_deadlines = async course_id => {
  const response = await axios.get(`${baseUrl}/`, { headers: { Authorization: localStorage.getItem('token'), courseid: course_id } })

  return response.data
}

const set_deadline = async data => {
  data.date.setHours(12)
  data.date.setMinutes(0)
  data.date.setSeconds(0)

  const response = await axios.post(`${baseUrl}/`, data, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

export default { get_deadlines, set_deadline }