import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND + '/deadline'

const get_all_deadlines = async () => {
  const response = await axios.get(`${baseUrl}/`, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

const get_deadline = async course_id => {
  const response = await axios.get(`${baseUrl}/${course_id}`, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

const set_deadline = async data => {

  data.date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeZone: 'Europe/Helsinki' }).format(data.date)

  const response = await axios.post(`${baseUrl}/`, data, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

const delete_deadline = async course_id => {
  const response = await axios.delete(`${baseUrl}/${course_id}`, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

export default { get_deadline, get_all_deadlines, set_deadline, delete_deadline }
