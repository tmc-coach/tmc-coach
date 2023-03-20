import ExercisesPage from './routes/ExercisePage'
import Login from './routes/Login'
import Home from './routes/Home'
import Orgs from './routes/Orgs'
import CoursesPage from './routes/CoursesPage'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import React from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import authService from './services/auth'
import SettingDeadline from './routes/SettingDeadline'

function App() {

  const Layout = () => (
    <>
      <Header />
      <Outlet />
    </>
  )
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorBoundary />,
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
        },
        {
          path: 'orgs/courses/:id/set_deadline',
          element: <SettingDeadline />,
          loader: authService.checkAuth
        },
        {
          path: '/orgs/courses/:course_id',
          element: <ExercisesPage />,
          loader: authService.checkAuth
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
