import React from 'react'
import PropTypes from 'prop-types'
import { AiFillDelete } from 'react-icons/ai'

const LineItem = ({ data, index, onChange, handleDelete }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target

    if (name === 'quantity' || name === 'price') {
      const regex = /^(\d+\.?\d*|\.\d+)$/
      if (value === '' || regex.test(value)) {
        const updatedData = { ...data, [name]: value }
        updatedData.amount = calcTotal(updatedData)
        onChange(index, updatedData)
      }
    } else {
      onChange(index, { ...data, [name]: value })
    }
  }

  function calcTotal(updatedData) {
    return updatedData.quantity * updatedData.price
  }

  return (
    <div className="grid grid-cols-12 px-20">
      <div className="  shadow-md shadow-shadow-purple border-1 border-color  py-4  px-8 col-span-2  rounded-l-md  dark:text-white dark:shadow-sm   dark:shadow-main-purple  ">
        <input
          type="text"
          className="w-full bg-gray-200  dark:bg-main-dark-bg"
          placeholder="Item"
          name="item"
          value={data.item}
          onChange={handleInputChange}
        />
        <div className="col-span-1 flex items-center justify-center"></div>
      </div>
      <div className=" shadow-md shadow-shadow-purple border-1 border-color  py-4 px-8 col-span-4  dark:text-white dark:shadow-sm   dark:shadow-main-purple ">
        <input
          type="text"
          className="w-full bg-gray-200 dark:bg-main-dark-bg"
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={handleInputChange}
        />
      </div>
      <div className=" shadow-md shadow-shadow-purple border-1 border-color  py-4 px-8 col-span-2 dark:text-white dark:shadow-sm   dark:shadow-main-purple  ">
        <input
          type="number"
          className="w-full bg-gray-200 dark:bg-main-dark-bg"
          placeholder="0"
          min="0"
          step="1"
          name="quantity"
          value={data.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div className=" shadow-md shadow-shadow-purple border-1 border-color py-4 px-8 col-span-2  dark:text-white dark:shadow-sm   dark:shadow-main-purple ">
        <input
          type="text"
          className="w-full bg-gray-200 dark:bg-main-dark-bg"
          placeholder="0.00"
          name="price"
          value={data.price}
          onChange={handleInputChange}
        />
      </div>
      <div className=" shadow-md pr-1 shadow-shadow-purple border-1 border-color py-4 px-8 col-span-2 dark:shadow-sm  dark:shadow-main-purple  flex align-items rounded-r-md ">
        <div className="w-full text-center bg-gray-200 dark:bg-main-dark-bg">
          ${data.amount.toFixed(2)}
        </div>
        <span className="">
          <button
            className=" text-main-table mr-3 rounded-sm hover:bg-red-700 hover:text-white "
            onClick={() => handleDelete(index)}
          >
            <AiFillDelete size={18} />
          </button>
        </span>
      </div>
    </div>
  )
}

LineItem.propTypes = {
  data: PropTypes.shape({
    item: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.any,
    price: PropTypes.any,
    amount: PropTypes.any,
  }),
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default LineItem
