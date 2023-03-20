import Logout from './LogOut'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <div className='w-full bg-blue-600'>
      <div className='nav container container-fluid'>
        <div className='flex justify-between items-center'>
          <Link className='text-white py-2' to='/'>TMC Coach</Link>
          { location.pathname !== '/login' && <Logout /> }
        </div>
      </div>
    </div>
  )
}

export default Header