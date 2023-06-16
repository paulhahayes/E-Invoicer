import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MapSearch from './MapSearch'
import api from '../utils/api'

const ClientModal = ({ isOpen, closeModal, onFormSubmit }) => {
  const API = api(process.env.REACT_APP_API_URL)
  const token = localStorage.getItem('e-invoice-token')

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactABN: '',
    StreetNumber: '',
    Street: '',
    Suburb: '',
    City: '',
    PostCode: '',
    State: '',
    Country: '',
    CountryCode: '',
  })

  if (!isOpen) {
    return null
  }

  const handleMapDataChange = (newMapData) => {
    setFormData((prevState) => ({
      ...prevState,
      StreetNumber: newMapData.StreetNumber,
      Street: newMapData.Street,
      Suburb: newMapData.Suburb,
      City: newMapData.City,
      PostCode: newMapData.PostCode,
      State: newMapData.State,
      Country: newMapData.Country,
      CountryCode: newMapData.CountryCode,
    }))
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // create a new client
    try {
      const results = await API.post('/customers', formData, {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
      if (results.status === 200) {
        onFormSubmit(results.data)
      } else {
        throw new Error('Error creating client')
      }
    } catch (error) {
      console.log(error)
    }
    closeModal()
  }

  return (
    <div className="fixed z-10 inset-0 top-36 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75 "></div>
        </div>

        <div
          className="inline-block align-bottom bg-gray-50 dark:bg-main-dark-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:max-w-2xl xl:max-w-4xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-gray-50 dark:bg-main-dark-bg px-6 pt-8 pb-6 sm:p-8 sm:pb-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Comapany Details
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1 border-color dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">Company</div>
                </div>

                <div className="h-12 col-span-6 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:shadow-main-purple    ">
                  <input
                    className="w-full text-main-table rounded-md dark:text-white bg-gray-50 dark:bg-main-dark-bg"
                    type="text"
                    required="true"
                    name="companyName"
                    id="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1 border-color dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">Name</div>
                </div>

                <div className="h-12 col-span-6 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:shadow-main-purple    ">
                  <input
                    className="dark:text-white bg-gray-50 dark:bg-main-dark-bg"
                    type="text"
                    required="true"
                    id="contactName"
                    placeholder="Contact Name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1 border-color dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">Email</div>
                </div>

                <div className="h-12 col-span-6 p-4 shadow-md shadow-shadow-purple  flex items-center justify-start rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:shadow-main-purple    ">
                  <input
                    className="dark:text-white bg-gray-50 dark:bg-main-dark-bg"
                    type="email"
                    id="contactEmail"
                    placeholder="Email"
                    name="contactEmail"
                    required="true"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1 border-color dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">Phone</div>
                </div>

                <div className="h-12 col-span-6 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:shadow-main-purple    ">
                  <input
                    className="dark:text-white bg-gray-50 dark:bg-main-dark-bg"
                    type="tel"
                    id="contactPhone"
                    placeholder="Phone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1 border-color dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">ABN</div>
                </div>

                <div className="h-12 col-span-6 p-4 shadow-md  shadow-shadow-purple flex items-center justify-start rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:shadow-main-purple    ">
                  <input
                    className="dark:text-white bg-gray-50 dark:bg-main-dark-bg"
                    type="text"
                    id="contactABN"
                    required="true"
                    name="contactABN"
                    placeholder="ABN"
                    value={formData.contactABN}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-8 px-4 mt-3">
                <div className="bg-gray-300 dark:border-1  border-color  dark:bg-main-table dark:text-white dark:shadow-main-purple dark:shadow-sm h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center rounded-l-md">
                  <div className="flex">Address</div>
                </div>

                <MapSearch
                  onMapChange={handleMapDataChange}
                  styles={
                    'h-12 col-span-6 px-4 py-4 shadow-md bg-gray-50 shadow-shadow-purple flex items-center rounded-r-md dark:border-1 border-color dark:text-white dark:shadow-sm dark:bg-main-dark-bg dark:shadow-main-purple text-main-table '
                  }
                />
              </div>

              <div className="px-4 pt-2 mt-4 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button
                  type="submit"
                  className="ease-linear cursor-pointer 
                  transition-all  duration-300 mt-3 w-full inline-flex justify-center rounded-md border-color border-1 shadow-sm px-8 py-2 bg-main-purple text-base font-medium  text-white hover:bg-main-table  dark:hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ease-linear cursor-pointer 
                  transition-all duration-300 mt-3 w-full inline-flex justify-center rounded-md border-color dark:text-white dark:hover:bg-violet-900 dar dark:bg-main-dark-bg border-1 shadow-sm px-4 py-2 bg-gray-50 text-base font-medium text-gray-700 hover:bg-main-table hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

ClientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default ClientModal
