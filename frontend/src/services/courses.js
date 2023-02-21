import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/api/courses' : process.env.REACT_APP_BASEURL + '/courses'

const get_exercises = async course_id => {

  const response = await axios.get(`${baseUrl}/${course_id}/exercises`, { headers: { Authorization: localStorage.getItem('token') } })
  console.log(response.data)


  return response.data
}

export default { get_exercises }
