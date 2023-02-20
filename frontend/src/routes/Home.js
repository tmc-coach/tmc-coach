import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import deadlineService from '../services/gettingDeadlines'


const Home = () => {
  const [deadlines, setDeadlines] = useState([])

  const username = localStorage.getItem('loggedInUser')

  useEffect(() => {
    deadlineService.get_deadlines({ username }).then(deadlines => setDeadlines(deadlines))
  }, [])

  return (
    <div>
      <br></br>
      <br></br>
      <Link to="/orgs">Organizations</Link>
      <br></br>
      <br></br>
      <p>Incoming deadlines:</p>
      <p>{deadlines}</p>
    </div>
  )
}
export default Home