import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/courses/' : process.env.REACT_APP_BASEURL + '/courses/'

const get_courses = async org_slug => {
  console.log('creating url')
  console.log(`${baseUrl}${org_slug}`)
  console.log(localStorage.getItem('user'))

  const response = await axios.get(`${baseUrl}${org_slug}`, { headers: { Authorization: localStorage.getItem('token') } })

  console.log('getting response')
  console.log(response)
  console.log(response.data)

  return response.data
}


export default { get_courses }
