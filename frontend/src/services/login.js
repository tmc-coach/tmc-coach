import axios from 'axios'

//const prod = process.env.NODE_ENV === 'production'
const baseUrl = process.env.REACT_APP_BASEURL

const login = async credentials => {
  const response = await axios.post(baseUrl + '/auth/authorize', credentials)
  return response.data.jwt
}

const check = async token => {
  try {
    const response = await axios.get(baseUrl + '/auth/user', { headers: { Authorization: token } })
    return response.data
  } catch (error) {
    return error.response.status
  }
}

export default { login, check }