import axios from 'axios'
import { redirect } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_BACKEND + '/auth'

const login = async credentials => {
  const response = await axios.post(baseUrl + '/authorize', credentials)
  return response.data.jwt
}

const getUser = async token => {
  try {
    const response = await axios.get(baseUrl + '/user', { headers: { Authorization: token } })
    return response
  } catch (error) {
    return error.response
  }
}

const checkAuth = async () => {
  const token = localStorage.getItem('user')
  if (!token) {
    return redirect('/login', { replace: true })
  }
  const user = await getUser(token)
  if (user.status && user.status !== 200) {
    localStorage.removeItem('user')
    return redirect('/login', { replace: true })
  }
  return null
}

const checkLogin = async () => {
  const token = localStorage.getItem('user')
  if (token) {
    const user = await getUser(token)
    if (user.status && user.status === 200) {
      return redirect('/orgs', { replace: true })
    }
  }
  return null
}

export default { login, getUser, checkAuth, checkLogin }