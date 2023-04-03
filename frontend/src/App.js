import ExercisesPage from './routes/ExercisePage'
import Login from './routes/Login'
import Orgs from './routes/Orgs'
import CoursesPage from './routes/CoursesPage'
import ProfilePage from './routes/ProfilePage'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
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
          element: <Orgs />,
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
          path: '/orgs/courses/:course_id',
          element: <ExercisesPage />,
          loader: authService.checkAuth
        },
        {
          path: 'profile',
          element: <ProfilePage />,
          loader: authService.checkAuth
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
