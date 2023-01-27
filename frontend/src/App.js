import './App.css'
//import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import axios from 'axios'
import(axios)

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

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password:
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
  )
}

export default App
