import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
const LogoutPage = () => {
  const navigate = useNavigate()
  const API = api(process.env.REACT_APP_API_URL)
  useEffect(() => {
    const logout = async () => {
      try {
        // Get token and user id from local storage
        const token = localStorage.getItem('e-invoice-token')
        const user = JSON.parse(
          localStorage.getItem('e-invoice-user')
        )
        console.log('user', user)

        // Set up the axios request headers with the token
        const config = {
          headers: {
            userId: user.userId,
            token,
          },
        }

        // Make the logout request
        await API.post(`/auth/logout`, { user }, config)

        // Remove the token and user id from local storage
        localStorage.removeItem('e-invoice-token')
        localStorage.removeItem('e-invoice-user')

        // Redirect the user to the login page
        navigate('/auth/login')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }

    logout()
  }, [navigate])

  return <div>Logging out...</div>
}

export default LogoutPage
