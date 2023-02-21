import axios from 'axios'
import { redirect } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_BASEURL

const login = async credentials => {
  const response = await axios.post(baseUrl + '/auth/authorize', credentials)
  return response.data.jwt
}

const getUser = async token => {
  try {
    const response = await axios.get(baseUrl + '/auth/user', { headers: { Authorization: token } })
    return response
  } catch (error) {
    return error.response
  }
}

const checkAuth = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return redirect('/login', { replace: true })
  }
  const user = await getUser(token)
  if (user.status && user.status !== 200) {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    return redirect('/login', { replace: true })
  }
  return null
}

const checkLogin = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const user = await getUser(token)
    if (user.status && user.status === 200) {
      return redirect('/', { replace: true })
    }
  }
  return null
}

export default { login, getUser, checkAuth, checkLogin }