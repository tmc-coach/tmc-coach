import axios from 'axios'
import(axios)
const baseUrl = 'http://localhost:5000/auth/authorize'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response
}

export default { login }