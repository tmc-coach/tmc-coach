import './App.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import React, { useEffect, useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', user)
      console.log(user)
    } catch (exception) {
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
    <div className="App">
      <header className="App-header">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </header>
    </div>
  )
}

export default App
