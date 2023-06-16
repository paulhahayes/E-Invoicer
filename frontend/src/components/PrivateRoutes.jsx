import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './SideBar'
import Navbar from './NavBar'

const PrivateRoutes = () => {
  const token = localStorage.getItem('e-invoice-token')

  if (!token) {
    return <Navigate to="/auth/login/" />
  }

  return (
    <div className="w-full bg-gray-200 dark:bg-main-dark-bg">
      <header className="fixed top-0 w-full z-10">
        <Sidebar />
        <Navbar />
      </header>
      <div
        className="relative bg-gray-200 dark:bg-main-dark-bg top-32 left-32"
        style={{ width: 'calc(100% - 142px)' }}
      >
        <div className="flex flex-col flex-grow ">
          <div className="flex-grow bg-gray-200  dark:bg-main-dark-bg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivateRoutes
