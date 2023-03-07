import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth'


const Login = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await authService.login({ username, password })
      localStorage.setItem('user', user)
      navigate('/')
    } catch (exception) {
      setErrorMessage('Invalid credentials. Try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h2 className="text-xl mb-4">Log in with your TMC account</h2>
        <p className="error">{errorMessage}</p>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-4">
            <label>Username or email</label>
            <input className="border rounded" type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input className="border rounded" type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 w-full mt-2 rounded text-white p-1" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login