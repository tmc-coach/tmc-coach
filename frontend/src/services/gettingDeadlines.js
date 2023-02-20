import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/deadline/' : process.env.REACT_APP_BASEURL + '/deadline/'

const get_deadlines = async username => {
  console.log(username.username)

  const response = await axios.get(`${baseUrl}${username.username}`, { headers: { Authorization: localStorage.getItem('token') } })

  return response.data
}

export default { get_deadlines }