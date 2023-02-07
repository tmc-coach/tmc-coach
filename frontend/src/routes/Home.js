import { useEffect } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import authService from '../services/auth'

const Home = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    return <Navigate to="/login" replace/>
  }

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
      <div className="flex justify-between items-center p-2 bg-blue-600">
        <h2 className="text-white">TMC Coach</h2>
        <form onSubmit={logout} className="bg-red-500 w-fit px-2.5 py-2 rounded text-white">
          <button type="submit">Sign out</button>
        </form>
      </div>
      <br></br>
      <br></br>
      <Link to="/orgs">Organizations</Link>
    </div>
  )
}
export default Home