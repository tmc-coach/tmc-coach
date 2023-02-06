import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = process.env.REACT_APP_BASEURL

const login = async credentials => {
  const response = await axios.post(baseUrl + '/auth/authorize', credentials)
  return response.data.jwt
}

const check = async token => {
  const response = await axios.post(baseUrl + '/auth/user', token)
  return response.data
}

export default { login }