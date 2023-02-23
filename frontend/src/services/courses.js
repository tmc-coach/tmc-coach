import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/api/courses' : process.env.REACT_APP_BASEURL + '/courses'

const get_course_info = async course_id => {

  const response = await axios.get(`${baseUrl}/${course_id}`, { headers: { Authorization: localStorage.getItem('token') } })


  return response.data
}

const get_exercises = async course_id => {

  const response = await axios.get(`${baseUrl}/${course_id}/exercises`, { headers: { Authorization: localStorage.getItem('token') } })
  return response.data

}

export default { get_exercises, get_course_info }
