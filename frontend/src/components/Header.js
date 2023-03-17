import Logout from './LogOut'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <div className='w-full py-2 lg:py-4 bg-blue-600'>
      <div className='container container-fluid'>
        <div className='flex justify-between items-center'>
          <Link className='text-white py-2' to='/'>TMC Coach</Link>
          { location.pathname !== '/login' && <Logout /> }
        </div>
      </div>
    </div>
  )
}

export default Header