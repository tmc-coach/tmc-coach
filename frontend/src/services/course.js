import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/course/' : process.env.REACT_APP_BASEURL + '/course/'

const get_course_info = async course_id => {

  const response = await axios.get(`${baseUrl}${course_id}`, { headers: { Authorization: localStorage.getItem('token') } })


  return response.data
}


export default { get_course_info }