import Logout from './LogOut'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  if (location.pathname==='/login') {
    return (
      <div className="flex justify-between items-center p-2 bg-blue-600">
        <h2 className="text-white">TMC Coach</h2>
      </div>
    )
  }
  return (
    <div className="flex justify-between items-center p-2 bg-blue-600">
      <h2 className="text-white">TMC Coach</h2>
      <Logout/>
    </div>
  )
}

export default Header