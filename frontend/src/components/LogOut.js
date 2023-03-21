import { Navigate } from 'react-router-dom'

const Logout = () => {

  const logout = () => {
    localStorage.removeItem('user')
    return <Navigate to="/login" replace/>
  }
  return(
    <form onSubmit={logout}>
      <button type="submit" className="bg-red-500 w-fit px-2.5 py-2 rounded text-white hover:bg-red-600">Sign out</button>
    </form>
  )
}
export default Logout
