import Logout from './LogOut'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <>
      <div className='w-full bg-gradient-to-r from-indigo-500 to-indigo-800'>
        <div className='nav container container-fluid'>
          <div className='flex justify-between items-center'>
            <Link className="text-white" to="/">TMC Coach</Link>
            { location.pathname !== '/login' && <Logout /> }
          </div>
        </div>
      </div>
      { location.pathname === '/login' && (
        <div className="flex flex-col justify-center bg-gradient-to-r from-indigo-500 to-indigo-800 text-center h-80">
          <div className="text-white text-4xl font-medium mb-2">TMC-Coach</div>
          <div className="text-white text-2xl font-medium">Schedule your courses and get feedback on your pace</div>
        </div>
      )}
    </>
  )
}

export default Header