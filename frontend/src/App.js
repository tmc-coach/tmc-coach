import './App.css'
import LoginForm from './components/LoginForm'
//import React, { useState, useEffect } from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/auth/authorize', {
      username, password
    }).then(function (response) {
      localStorage.setItem('user', response.data.jwt)
      setUser(response.data.jwt)
    }).catch(function (error) {
      console.log(error)
    })
    console.log('logging in with', username)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(user)
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
