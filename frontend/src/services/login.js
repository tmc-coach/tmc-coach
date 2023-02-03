import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/auth/authorize' : process.env.REACT_APP_BASEURL + '/auth/authorize'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data.jwt
}

export default { login }