import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
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
      localStorage.setItem('user', user)
      navigate('/')
    } catch (exception) {
      setErrorMessage('Invalid credentials. Try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      console.log(exception)
    }
  }


  const user = localStorage.getItem('user')
  if (user) {
    return <Navigate to="/" replace/>
  }

  return <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleLogin={handleLogin}
    errorMessage={errorMessage}/>
}

export default Login