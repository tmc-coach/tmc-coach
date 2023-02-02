import './App.css'
import Login from './routes/Login'
import Home from './routes/Home'
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
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
