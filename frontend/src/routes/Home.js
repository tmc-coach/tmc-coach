import FrontpageForm from '../components/FrontpageForm'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import loginService from '../services/login'

const Home = () => {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    return <Navigate to="/login" replace/>
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigate('/login', { replace: true })
    }
    const user = await loginService.checkAuth(token)
    if (user.status && user.status !== 200) {
      localStorage.removeItem('token')
      return navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    checkAuth()
  })

  return <FrontpageForm
    logout={logOut}
  />
}

export default Home