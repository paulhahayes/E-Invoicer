import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const TotalAmount = ({ items, taxRate, discountRate }) => {
  const totalAmount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.amount, 0)
  }, [items])

  const totalDiscount = useMemo(() => {
    return totalAmount * (discountRate / 100)
  }, [totalAmount, discountRate])

  const discountedAmount = useMemo(() => {
    return totalAmount - totalDiscount
  }, [totalAmount, totalDiscount])

  const totalTax = useMemo(() => {
    return discountedAmount * (taxRate / 100)
  }, [discountedAmount, taxRate])

  const finalTotalAmount = useMemo(() => {
    return discountedAmount + totalTax
  }, [discountedAmount, totalTax])

  return (
    <div className="px-20 grid grid-cols-12 ">
      <div className="col-span-8"></div>
      <div className="col-span-2">
        <div className="shadow-md shadow-shadow-purple text-main-table  border-1 border-color font-bold py-2 px-8  dark:text-white dark:shadow-sm    rounded-l-md">
          Tax Total
        </div>
        <div className="shadow-md shadow-shadow-purple text-main-table  border-1 border-color font-bold py-2 px-8  dark:text-white dark:shadow-sm  rounded-l-md">
          Discount
        </div>
        <div className=" shadow-md shadow-shadow-purple border-2 border-color bg-gray-300 dark:bg-table-dark-bg text-main-table  font-bold py-2 px-8  dark:text-white dark:shadow-sm  rounded-l-md">
          Total
        </div>
      </div>
      <div className="col-span-2">
        <div className="py-2 px-8 shadow-md text-main-table shadow-shadow-purple border-1 border-color  dark:text-white dark:shadow-sm     rounded-r-md">
          <div className="w-full text-center bg-gray-200 dark:bg-main-dark-bg rounded-r-md">
            ${totalTax.toFixed(2)}
          </div>
        </div>

        <div className="py-2 px-8 shadow-md text-main-table shadow-shadow-purple border-1 border-color  dark:text-white dark:shadow-sm     rounded-r-md">
          <div className="w-full text-center bg-gray-200 dark:bg-main-dark-bg rounded-r-md">
            ${totalDiscount.toFixed(2)}
          </div>
        </div>
        <div className="border-2 border-color shadow-md shadow-shadow-purple bg-gray-300 font-bold dark:bg-table-dark-bg  py-2 px-8  dark:text-white dark:shadow-sm    rounded-r-md">
          <div className="w-full text-center bg-gray-300 dark:bg-table-dark-bg text-main-table dark:text-white">
            ${finalTotalAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

TotalAmount.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  discountRate: PropTypes.number.isRequired,
  taxRate: PropTypes.number.isRequired,
}

export default TotalAmount
