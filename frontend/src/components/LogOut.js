import { Navigate } from 'react-router-dom'

const Logout = () => {

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    return <Navigate to="/login" replace/>
  }
  return(
    <form onSubmit={logout} className="bg-red-500 w-fit px-2.5 py-2 rounded text-white">
      <button type="submit">Sign out</button>
    </form>
  )
}
export default Logout
