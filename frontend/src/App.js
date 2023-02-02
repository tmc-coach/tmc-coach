import './App.css'
import loginService from './services/login'
import Login from './routes/Login'
import Home from './routes/Home'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
