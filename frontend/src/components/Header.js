import Logout from './LogOut'
const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-blue-600">
      <h2 className="text-white">TMC Coach</h2>
      <Logout/>
    </div>
  )
}

export default Header