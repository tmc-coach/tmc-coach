import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import React from 'react'
import { RouterProvider, Route, redirect, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import authService from './services/auth'

function App() {
  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('ok')
      return redirect('/login', { replace: true })
    }
    const user = await authService.getUser(token)
    if (user.status && user.status !== 200) {
      localStorage.removeItem('token')
      return redirect('/login', { replace: true })
    }
    return null
  }

  const checkLogin = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = await authService.getUser(token)
      if (user.status && user.status === 200) {
        return redirect('/', { replace: true })
      }
    }
    return null
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login />} loader={checkLogin}/>
        <Route path="/" element={<Home />} loader={checkAuth}/>
        <Route path="/orgs" element={<Orgs />} loader={checkAuth}/>
        <Route path="/orgs/:slug" element={null} loader={checkAuth}/>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
