import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import Header from './components/Header'
import React from 'react'
import { RouterProvider, redirect, createBrowserRouter, Outlet } from 'react-router-dom'
import authService from './services/auth'

function App() {
  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
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
  const Layout = () => (
    <>
      <Header />
      <Outlet />
    </>
  )
  const router = createBrowserRouter([
    { element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />,
          loader: checkLogin
        },
        {
          path: '/',
          element: <Home />,
          loader: checkAuth
        },
        {
          path: '/orgs',
          element: <Orgs />,
          loader: checkAuth
        },
        {
          path: 'orgs/:slug',
          element: null,
          loader: checkAuth
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
