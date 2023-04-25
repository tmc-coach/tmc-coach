import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND + '/courses'

const get_exercises = async course_id => {

  const response = await axios.get(`${baseUrl}/${course_id}/exercises`, { headers: { Authorization: localStorage.getItem('user') } })
  return response.data

}

export default { get_exercises }
