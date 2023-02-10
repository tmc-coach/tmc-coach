import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import Header from './components/Header'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header/>
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
