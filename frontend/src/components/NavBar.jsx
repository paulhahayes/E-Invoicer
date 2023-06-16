import React, { useState, useEffect } from 'react'
import Searchbar from './SearchBar'
import NavbarIcon from './NavBarIcon'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'
import {
  BsChevronDown,
  BsFileEarmarkPlusFill,
  BsFillPersonFill,
} from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const navigateToProfile = () => {
    navigate('/profile', { state: { userDetails: userDetails } })
  }
  const navigateToCreateInvoice = () => {
    navigate('/new-invoice', { state: { userDetails: userDetails } })
  }

  const [userDetails, setUserDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const API = api(process.env.REACT_APP_API_URL)

  // get users

  const handleSubmit = async (searchTerm) => {
    console.log('searchTerm', searchTerm)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get user details from local storage
        const user = JSON.parse(localStorage.getItem('e-invoice-user'))

        // get user details from the backend
        const results = await API.get(`/users/${user.userId}`)

        // set user details
        setUserDetails(results.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="navbar">
      <div className="navbar-items gap-3">
        <div className="welcome-message">
          Welcome back,{' '}
          {isLoading
            ? 'Loading...'
            : userDetails?.name
            ? userDetails.name + '.'
            : ''}
        </div>
        <div>
          <Searchbar onSubmit={handleSubmit} />
        </div>

        <div
          className="no-underline text-main-table  dark:hover:text-white "
          onClick={navigateToCreateInvoice}
        >
          <div className="navbar-icon dark:text-white text-white shadow-md shadow-shadow-purple bg-main-purple   hover:bg-violet-900 ">
            <NavbarIcon
              icon={<BsFileEarmarkPlusFill />}
              text={'New Invoice'}
              isActive={location.pathname === '/new-invoice'}
            />
          </div>
        </div>

        {/* WARNING ISSUES NO LONGER SEND INVOICE */}
        <NavLink to="/send-invoice" className="no-underline text-main-table ">
          <div className="navbar-icon hover:text- dark:bg-main-table text-main-table dark:hover:bg-white dark:hover:text-main-table  ">
            <NavbarIcon
              icon={<BsChevronDown className="" />}
              text={'Recent'}
              isActive={location.pathname === '/send-invoice'}
            />
          </div>
        </NavLink>

        <div className="sidebar-icon mb-0">{<IoNotifications />}</div>

        <div
          className="sidebar-icon rounded-full mb-0"
          onClick={navigateToProfile}
        >
          {<BsFillPersonFill />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
