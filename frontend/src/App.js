import './App.css'
import LoginForm from './components/LoginForm'
import FrontpageForm from './components/FrontpageForm'
import loginService from './services/login'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const Login = ( props ) => {
  const user = localStorage.getItem('user')
  if (user) {
    return <Navigate to="/" replace/>
  }
  return <LoginForm
    username={props.username}
    password={props.password}
    handleUsernameChange={({ target }) => props.setUsername(target.value)}
    handlePasswordChange={({ target }) => props.setPassword(target.value)}
    handleLogin={props.handleLogin}
    errorMessage={props.errorMessage}/>
}

const Home = () => {
  const user = localStorage.getItem('user')
  console.log(!user)
  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace/>
  }
  return <FrontpageForm />
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', user)
      setUser(user)
      console.log(user)
    } catch (exception) {
      setErrorMessage('Invalid credentials. Try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      console.log(exception)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      console.log('logged in')
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login username={username}
          password={password} setUsername={setUsername}
          setPassword={setPassword} handleLogin={handleLogin}
          errorMessage={errorMessage} />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
