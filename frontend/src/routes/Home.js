import FrontpageForm from '../components/FrontpageForm'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" replace/>
  }

  const logOut = () => {
    localStorage.removeItem('user')
    return <Navigate to="/login" replace/>
  }

  return <FrontpageForm
    logout={logOut}
  />
}

export default Home