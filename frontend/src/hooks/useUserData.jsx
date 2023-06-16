import { useState, useEffect } from 'react'
import api from '../utils/api'

const API = api(process.env.REACT_APP_API_URL)

const useUserData = (userDetails, token, setData) => {
  const [userData, setUserData] = useState(null)

  const getUserCompanyDetails = async () => {
    const results = await API.get(`/customers/${userDetails.companyName}`, {
      headers: { token: token },
    })
    const fetchedUser = results.data
    setData((prevData) => ({
      ...prevData,
      userData: fetchedUser,
    }))
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserCompanyDetails()
      setUserData(user)
    }
    fetchUser()
  }, [])
  return userData
}

export default useUserData
