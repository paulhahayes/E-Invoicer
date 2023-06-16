import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import api from '../utils/api'
const RegisterUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [companyKey, setCompanyKey] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const API = api(process.env.REACT_APP_API_URL)

  const navigateToRegisterCompany = () => {
    navigate('auth/registerCompany')
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await API.post('/auth/registerUser', {
        email,
        password,
        name,
        companyKey,
      })
      // Set the e-invoice-token in local storage
      localStorage.setItem('e-invoice-token', response.data.token)
      localStorage.setItem(
        'e-invoice-user',
        JSON.stringify(response.data)
      )
      // Navigate to the home page
      navigate('/')
    } catch (error) {
      console.error(error) // Handle registration error
      setError(error.response.data.message)
    }
  }

  // Set the companyKey state with the value passed from the register company component
  React.useEffect(() => {
    if (location?.state?.companyKey) {
      setCompanyKey(location.state.companyKey)
    }
  }, [location?.state?.companyKey])

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleRegister}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Get started for free</h3>
          {error && <p className='error'>{error}</p>}
          <button
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
          <div className='form-row space-x-3'>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                id='name'
                className='form-control mt-1'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Company key</label>
              <input
                type='text'
                id='companyKey'
                className='form-control mt-1'
                placeholder='Enter company key'
                value={companyKey}
                onChange={(e) => setCompanyKey(e.target.value)}
                readOnly={Boolean(companyKey)}
              />
            </div>
          </div>
          <div className='form-group mt-3'>
            <label>Email</label>
            <input
              type='email'
              id='email'
              className='form-control mt-1'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              id='password'
              className='form-control mt-1'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button className='main-btn' type='submit'>
              Get started
            </button>
          </div>
          <p className='Already registered text-center mt-2'>
            <NavLink
              to='/auth/login'
              className='link-to-another-page'
            >
              Already have an account?
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterUser
