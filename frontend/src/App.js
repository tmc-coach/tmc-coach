import './App.css'
import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      console.log('logged in')
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/orgs" element={<Orgs />} />
        <Route path="/orgs/:slug" element={null} />
      </Routes>
    </Router>
  )
}

export default App
