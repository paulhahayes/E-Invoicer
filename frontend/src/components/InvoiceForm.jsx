import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import PropTypes from 'prop-types'

const InvoiceForm = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="grid grid-cols-12 px-20 mt-3">
        {/* Invoice Number */}
        <div
          className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
    dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color 
    "
        >
          <div className="flex ">Invoice # </div>
        </div>
        <div
          className="h-12 col-span-10 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md
    dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color
       "
        >
          <input
            className="px-2 bg-gray-200 dark:bg-main-dark-bg"
            name="invoiceNumber"
            required="true"
            placeholder="001"
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Date */}
      <div className="grid grid-cols-12 px-20 mt-3">
        <div
          className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
    dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color 
    "
        >
          <div className="flex ">Date </div>
        </div>
        <div
          className=" h-12 col-span-4 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md mr-2
                    dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color"
        >
          <div className="relative w-full">
            <input
              type="text"
              className="bg-gray-200 w-full px-2 pr-6 text-main-table dark:bg-main-dark-bg dark:text-white"
              placeholder="Select a date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <FiCalendar className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl text-main-table hover:cursor-pointer hover:text-main-purple" />
          </div>
        </div>

        {/* Due Date */}
        <div
          className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
                    dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color  ml-2"
        >
          <div className="flex ">Due Date </div>
        </div>
        <div
          className=" h-12 col-span-4 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md
    dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color
    "
        >
          <div className="relative w-full">
            <input
              type="text"
              className="bg-gray-200 w-full pr-6  text-main-table dark:bg-main-dark-bg dark:text-white"
              placeholder="Select a date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <FiCalendar className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl text-main-table hover:cursor-pointer hover:text-main-purple" />
          </div>
        </div>
      </div>

      {/* Currency */}
      <div className="grid grid-cols-12 px-20 mt-3">
        <div
          className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
    dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color "
        >
          <div className="flex ">Currency </div>
        </div>
        <div
          className="h-12 col-span-1 py-4 px-3 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md   mr-2 
    dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color"
        >
          <input
            className="bg-gray-200 overflow-hidden text-main-table dark:bg-main-dark-bg dark:text-white"
            placeholder="AUD"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          ></input>
        </div>

        {/* Discount */}
        <div
          className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
    dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color  ml-2"
        >
          <div className="flex ">Discount %</div>
        </div>
        <div
          className="h-12 col-span-1 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md  mr-2 
    dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color "
        >
          <input
            className=" bg-gray-200 overflow-hidden text-main-table dark:bg-main-dark-bg dark:text-white"
            placeholder="0%"
            name="discountRate"
            value={formData.discountRate}
            onChange={handleChange}
          ></input>
        </div>
      </div>
    </div>
  )
}

InvoiceForm.propTypes = {
  formData: PropTypes.shape({
    invoiceNumber: PropTypes.string,
    date: PropTypes.string,
    dueDate: PropTypes.string,
    currency: PropTypes.string,
    discountRate: PropTypes.number,
  }),
  handleChange: PropTypes.func,
}
export default InvoiceForm
