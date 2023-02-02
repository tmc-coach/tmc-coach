import LoginForm from '../components/LoginForm'
import { Navigate } from 'react-router-dom'

const Login = ({ username, setUsername, password, setPassword, handleLogin, errorMessage }) => {
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