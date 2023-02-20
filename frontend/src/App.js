import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import CoursesPage from './routes/CoursesPage'
import Header from './components/Header'
import React from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import authService from './services/auth'

function App() {

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
          loader: authService.checkLogin
        },
        {
          path: '/',
          element: <Home />,
          loader: authService.checkAuth
        },
        {
          path: '/orgs',
          element: <Orgs />,
          loader: authService.checkAuth
        },
        {
          path: 'orgs/:slug',
          element: <CoursesPage />,
          loader: authService.checkAuth
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
