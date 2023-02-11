import Logout from './LogOut'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  if (location.pathname==='/login') {
    return (
      <div className="flex justify-between items-center p-2 bg-blue-600">
        <Link className="text-white" to="/">TMC Coach</Link>
      </div>
    )
  }
  return (
    <div className="flex justify-between items-center p-2 bg-blue-600">
      <Link className="text-white" to="/">TMC Coach</Link>
      <Logout/>
    </div>
  )
}

export default Header