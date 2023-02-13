import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import CoursesPage from './routes/CoursesPage'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/orgs" element={<Orgs />} />
        <Route path="/orgs/:slug" element={<CoursesPage />} />
      </Routes>
    </Router>
  )
}

export default App
