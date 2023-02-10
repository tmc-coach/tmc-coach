import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/auth'

const Home = () => {
  const navigate = useNavigate()

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigate('/login', { replace: true })
    }
    const user = await authService.getUser(token)
    if (user.status && user.status !== 200) {
      localStorage.removeItem('token')
      return navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    checkAuth()
  })

  return (
    <div>
      <br></br>
      <br></br>
      <Link to="/orgs">Organizations</Link>
    </div>
  )
}
export default Home