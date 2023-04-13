import authService from '../services/auth'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import profile from '../assets/profile.png'


const Profile = () => {
  const [userinfo, setInformation] = useState([])

  useEffect(() => {
    authService.get_user_email().then(userinfo => setInformation(userinfo))
  }, [])

  return (
    <>
      {userinfo.user_email !== undefined ? (
        <div className='main container container-fluid'>
          <h1>My Account</h1>
          <div className='flex justify-center items-center py-10'>
            <img width={100} height={60} src={profile} />
            <div className='p-2 font-small text-left'>
              <p>E-mail: {userinfo.user_email}</p>
            </div>
          </div>
          <h1>My scheduled courses</h1>
          <div className='flex justify-center items-center'>
            {userinfo.courses.length === 0 ? (
              <p>You dont have any scheduled courses</p>
            ) : (
              userinfo.courses.map((course, index) => (
                <p key={index}>
                  <Link className="flex text-blue-500 text-2xl hover:underline mr-5" to={`/orgs/courses/${course.course_id}`}>{userinfo.titles[index]}</Link>
                </p>
              ))
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )
      }
    </>
  )
}

export default Profile
