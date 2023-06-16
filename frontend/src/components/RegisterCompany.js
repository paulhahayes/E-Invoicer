import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import api from '../utils/api'
import MapSearch from './MapSearch'
const RegisterCompany = () => {
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [ABN, setABN] = useState('')
  const [numEmployees, setNumEmployees] = useState('')
  const [companyAddress, setCompanyAddress] = useState({})

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const API = api(process.env.REACT_APP_API_URL)

  const navigateToRegisterUser = () => {
    navigate('/auth/registerUser')
  }

  const handleRegister = async (event) => {
    try {
      event.preventDefault()
      const response = await API.post('/auth/registerCompany/v2', {
        companyName,
        companyEmail,
        numEmployees,
        ABN,
        companyAddress,
      })

      console.log(response.data.companyKey)
      navigate('/auth/registerUser', {
        state: { companyKey: response.data.companyKey },
      })
    } catch (error) {
      console.error(error) // handle registration error
      setError(error.response.data.message)
    }
  }

  const handleMapDataChange = (newMapData) => {
    setCompanyAddress({
      street: `${newMapData.StreetNumber} ${newMapData.Street}`,
      suburb: newMapData.City,
      state: newMapData.State,
      city: newMapData.Suburb,
      postcode: newMapData.PostCode,
      country: newMapData.Country,
      countryCode: newMapData.CountryCode,
    })
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Get started for free</h3>
          {error && <p className="error">{error}</p>}
          <button className="switch-page" onClick={navigateToRegisterUser}>
            Sign up as a user
          </button>
          <div className="line">
            <hr className="line-left" />
            <p className="line-text">or</p>
            <hr className="line-right" />
          </div>
          <div className="form-row space-x-3">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                id="companyName"
                className="form-control mt-1"
                placeholder="Enter name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ABN</label>
              <input
                type="ABN"
                id="ABN"
                className="form-control mt-1"
                placeholder="Enter ABN"
                value={ABN}
                onChange={(e) => setABN(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Company Email</label>
            <input
              type="companyEmail"
              id="companyEmail"
              className="form-control mt-1"
              placeholder="Enter email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Number of Employees</label>
            <input
              type="numEployees"
              id="numEmployees"
              className="form-control mt-1"
              placeholder="Enter number of employees"
              value={numEmployees}
              onChange={(e) => setNumEmployees(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Company Address</label>
            <MapSearch
              onMapChange={handleMapDataChange}
              styles={
                'h-10 bg-white border-1 px-2 border-gray-300 rounded-sm w-full py-3 flex items-center text-main-table'
              }
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button className="main-btn" onClick={handleRegister}>
              Register
            </button>
          </div>
          <p className="Already registered text-center mt-2">
            <NavLink to="/auth/login" className="link-to-another-page">
              Already have an account?
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterCompany
