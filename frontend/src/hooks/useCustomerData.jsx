import { useState, useEffect } from 'react'
import api from '../utils/api'

const API = api(process.env.REACT_APP_API_URL)

const useCustomerData = (token, setData) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerOptions, setCustomerOptions] = useState([])

  useEffect(() => {
    const fetchCustomerData = async () => {
      const results = await API.get('/customers/', {
        headers: { token: token },
      })
      const customers = results.data
      const returnCustomers = customers.map((customer) => {
        return {
          value: customer.companyName,
          label: customer.companyName,
          customerData: customer,
        }
      })
      return returnCustomers
    }

    const fetchData = async () => {
      const options = await fetchCustomerData()

      setCustomerOptions(options)
    }

    fetchData()
  }, [selectedCustomer, token])

  const handleCustomerChange = (selectedOption) => {
    setData((prevData) => ({
      ...prevData,
      customerData: selectedOption.customerData,
    }))
    setSelectedCustomer(selectedOption.value)
  }

  const handleModalSubmit = (formData) => {
    setData((prevData) => ({
      ...prevData,
      customerData: formData.customerData,
    }))
    setSelectedCustomer(formData.customerData.companyName)
  }

  return [
    customerOptions,
    handleCustomerChange,
    handleModalSubmit,
    selectedCustomer,
  ]
}

export default useCustomerData
