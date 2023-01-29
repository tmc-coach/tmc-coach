import './App.css'
import LoginForm from './components/LoginForm'
//import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/auth/authorize', {
      username, password
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
    console.log('logging in with', username)
  }

  const testAuth = () => {
    // axios with httponly cookie
    axios.get('http://localhost:5000/auth/test', {
      withCredentials: true
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }

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
        <div>
          <button onClick={testAuth}>Test Auth</button>
        </div>
      </header>
    </div>
  )
}

export default App
