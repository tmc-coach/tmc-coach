import './App.css'
import Login from './routes/Login'
import Home from './routes/Home'
import React from 'react'
import { BrowserRouter as  Routes, Route } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />}/>
      </Route>
    </Routes>
  )
}

export default App
