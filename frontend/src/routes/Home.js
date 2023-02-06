import FrontpageForm from '../components/FrontpageForm'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import loginService from '../services/login'

const Home = () => {
  useEffect(() => {

    const testAuth = async () => {
      const user = localStorage.getItem('user')
      const auth = await loginService.check(user)
      console.log(auth === 401)
      if (auth === 401) {
        return <Navigate to="/login" replace/>
      }
    }

    testAuth()
  }, [])

  const logOut = () => {
    localStorage.removeItem('user')
    return <Navigate to="/login" replace/>
  }

  return <FrontpageForm
    logout={logOut}
  />
}

export default Home