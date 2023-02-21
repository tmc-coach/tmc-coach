import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/exercises/' : process.env.REACT_APP_BASEURL + '/exercises/'

const get_exercises = async (course_id) => {
  const response = await axios.get(`${baseUrl}${course_id}`, {
    headers: { Authorization: localStorage.getItem('token') },
  })

  return response.data
}

export default { get_exercises }
