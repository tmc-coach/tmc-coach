import Logout from './LogOut'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  if (location.pathname === '/login') {
    return (
      <div>
        <div className="flex justify-between items-center p-2 bg-blue-600">
          <Link className="text-white" to="/">TMC Coach</Link>
        </div>
        <div className="flex flex-col justify-center bg-blue-600 text-center h-80">
          <div className="text-white text-4xl font-medium mb-2">TMC-Coach</div>
          <div className="text-white text-2xl font-medium">Schedule your courses and get feedback on your pace</div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-between items-center p-2 bg-blue-600">
      <Link className="text-white" to="/">TMC Coach</Link>
      <Logout />
    </div>
  )
}

export default Header