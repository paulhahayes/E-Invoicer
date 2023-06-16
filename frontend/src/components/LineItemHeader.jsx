import React from 'react'

const LineItemHeader = () => {
  return (
    <div className="grid grid-cols-12 px-20 mt-3">
      <div className=" shadow-md shadow-shadow-purple border-1 border-color px-8 col-span-2 py-2 rounded-l-md bg-gray-300  dark:text-white dark:shadow-sm dark:bg-main-table dark:shadow-main-purple  ">
        Item
      </div>
      <div className="   shadow-md shadow-shadow-purple border-1 border-color px-8 col-span-4 py-2 bg-gray-300 dark:text-white dark:shadow-sm dark:bg-main-table dark:shadow-main-purple  ">
        Description
      </div>
      <div className="   shadow-md shadow-shadow-purple border-1 border-color px-8 col-span-2  py-2  bg-gray-300 dark:text-white dark:shadow-sm dark:bg-main-table dark:shadow-main-purple  ">
        Quantity
      </div>
      <div className="   shadow-md shadow-shadow-purple border-1 border-color px-8 col-span-2 py-2 bg-gray-300 dark:text-white dark:shadow-sm dark:bg-main-table dark:shadow-main-purple  ">
        Unit Price
      </div>
      <div
        className="   shadow-md shadow-shadow-purple border-1 border-color px-8 py-2 col-span-2   rounded-r-md bg-gray-300 dark:text-white dark:shadow-sm dark:bg-main-table 
      text-center   dark:shadow-main-purple  "
      >
        Line Total
      </div>
    </div>
  )
}

export default LineItemHeader
