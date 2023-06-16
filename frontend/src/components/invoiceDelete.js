/* eslint-disable react/prop-types */
import React from 'react'
import api from '../utils/api'

const InvoiceDelete = ({ invoice, closeInvoice, handleTrigger }) => {
  const API = api(process.env.REACT_APP_API_URL)

  const handleDelete = async () => {
    const token = localStorage.getItem('e-invoice-token')
    try {
      const response = await API.delete(
        `/invoice/delete/${invoice.invoiceId}`,
        {
          headers: {
            token: token,
          },
        }
      )

      if (response.status === 200) {
        handleTrigger()
      } else {
        const error = response.data ? response.data : response
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="overlay relative">
      <div
        className="bg-white rounded-lg h-72 flex flex-col text-black w-1/2 m-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{ position: 'fixed' }}
      >
        <hr className="mt-9 ml-5 mr-5 border-gray-500" />
        <h2 className="text-center font-bold text-2xl my-2">
          Confirm Deletion
        </h2>
        <p className="text-center font-bold text-lg my-3">
          Are you sure you want to delete this invoice?
        </p>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
          }}
        >
          <button
            className="mt-5 ml-8 bg-red-400 hover:bg-gray-400 h-12 w-[45%] text-xl rounded-xl font-extrabold text-white font-roboto"
            onClick={() => {
              handleDelete()
              closeInvoice()
              // handleTrigger()
              // window.location.reload()
            }}
          >
            Delete
          </button>
          <button
            onClick={closeInvoice}
            className="mt-5 mr-8 bg-gray-400 h-12 w-[45%] text-xl rounded-xl font-extrabold text-white font-roboto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDelete
