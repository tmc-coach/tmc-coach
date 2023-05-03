import Logout from './LogOut'
import authService from '../services/auth'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = () => {
  const location = useLocation()
  const [email, setEmail] = useState('')

  useEffect(() => {
    authService.get_user_email().then(email => setEmail(email))
  }, [location.pathname])

  return (
    <>
      <div className='w-full bg-gradient-to-r from-indigo-500 to-indigo-800'>
        <div className='nav container container-fluid'>
          <div className='flex justify-between items-center'>
            <Link className="text-white" to="/">TMC Coach</Link>
            <div className="flex items-center justify-between">
              {location.pathname !== '/login' && (
                <>
                  <Link className="inline-block bg-white text-black px-2.5 py-2 rounded hover:bg-gray-200 mr-5" to="/profile">{email.user_email}</Link>
                  <Logout />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {location.pathname === '/login' && (
        <div className="flex flex-col justify-center bg-gradient-to-r from-indigo-500 to-indigo-800 text-center h-80">
          <div className="text-white text-4xl font-medium mb-2">TMC Coach</div>
          <div className="text-white text-2xl font-medium">Schedule your courses and get feedback on your pace</div>
        </div>
      )}
    </>
  )
}

export default Header