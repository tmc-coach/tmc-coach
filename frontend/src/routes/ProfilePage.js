//import { useState, useEffect } from 'react'
//import { useLocation } from 'react-router-dom'
//import { Navigate } from 'react-router-dom'
import authService from '../services/auth'
import { useState, useEffect } from 'react'
//import Loading from '../components/Loading'
import profile from '../assets/profile.png'


const Profile = () => {
  const [email, setEmail] = useState([])

  useEffect(() => {
    authService.get_user_email().then(email => setEmail(email))
  }, [])

  return (
    <>
      <div className='main container container-fluid'>
        <h1>My Account</h1>
        <div className='flex justify-center items-center py-10'>
          <img width={100} height={60} src={profile}/>
          <div className='p-2 font-small text-left'>
            <p>E-mail: {email.user_email}</p>
            <p>Language: english</p>
          </div>
        </div>
        <h1>My course deadlines</h1>
      </div>
    </>
  )
}

export default Profile