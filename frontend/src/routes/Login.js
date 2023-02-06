import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'


const Login = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('token', user)
      navigate('/')
    } catch (exception) {
      setErrorMessage('Invalid credentials. Try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      console.log(exception)
    }
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = await loginService.checkAuth(token)
      if (user.status && user.status === 200) {
        return navigate('/', { replace: true })
      }
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleLogin={handleLogin}
    errorMessage={errorMessage}/>
}

export default Login