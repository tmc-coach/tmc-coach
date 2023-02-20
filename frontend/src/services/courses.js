import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/courses/' : process.env.REACT_APP_BASEURL + '/courses/'

const get_courses = async (org_slug) => {
  const response = await axios.get(`${baseUrl}${org_slug}`, {
    headers: { Authorization: localStorage.getItem('token') },
  })

  return response.data
}

export default { get_courses }
