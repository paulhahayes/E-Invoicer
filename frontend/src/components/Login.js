import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import api from '../utils/api'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const API = api(process.env.REACT_APP_API_URL)
  const navigateToRegisterCompany = () => {
    navigate('/auth/registerCompany')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      })
      // Set the e-invoice-token in local storage
      localStorage.setItem('e-invoice-token', response.data.token)
      // Set the e-invoice-user in local storage
      localStorage.setItem(
        'e-invoice-user',
        JSON.stringify(response.data)
      )
      // Navigate to the home page
      // change to Navlink

      navigate('/')
    } catch (error) {
      console.error(error) // Handle login error
      setError(error.response.data.message)
    }
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleLogin}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Get started for free</h3>
          {error && <p className='error'>{error}</p>}
          <button
            type='button'
            className='switch-page'
            onClick={navigateToRegisterCompany}
          >
            Sign up as a company
          </button>
          <div className='line'>
            <hr className='line-left' />
            <p className='line-text'>or</p>
            <hr className='line-right' />
          </div>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              id='email'
              className='form-control mt-1'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              id='password'
              className='form-control mt-1'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button className='main-btn' type='submit' autoFocus>
              Login
            </button>
          </div>
          <p className='Already registered text-center mt-2'>
            <NavLink
              to='/auth/registerUser'
              className='link-to-another-page'
            >
              Don&apos;t have an account?
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
