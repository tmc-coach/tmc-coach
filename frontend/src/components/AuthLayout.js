import { Navigate, Outlet } from 'react-router-dom'
import loginService from '../services/login'

const AuthLayout = async () => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to='/login' replace/>
  }
  const isAuthenticated = await loginService.check(user)
  console.log(isAuthenticated)
  if (isAuthenticated === 401) {
    return <Navigate to='/login' replace/>
  }
  return isAuthenticated ? <Outlet /> : null
}

export default AuthLayout