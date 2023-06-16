/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

//icons
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { BsPlusSquare } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import XMLEditor from '../components/XMLEditor'

// utils
import { generateInvoice } from '../utils/generateInvoice'

// components
import TotalAmount from '../components/TotalAmount'
import ClientModal from '../components/ClientModal'
import SearchableDropdown from '../components/SearchableDropdown'
import LineItem from '../components/LineItem'
import LineItemHeader from '../components/LineItemHeader'
import InvoiceForm from '../components/InvoiceForm'
import LanguageSelector from '../components/LanguageSelector'
import EncryptModal from '../components/EncryptModal'

//hooks
import { useInvoiceForm } from '../hooks/useInvoiceForm'
import { useInvoiceActions } from '../hooks/useInvoiceActions'
import useUserData from '../hooks/useUserData'
import useCustomerData from '../hooks/useCustomerData'
import useModal from '../hooks/useModal'
import useCheckTheme from '../hooks/useCheckTheme'

const CreateInvoicePage = () => {
  // set up
  const token = localStorage.getItem('e-invoice-token')
  const location = useLocation()
  const userDetails = location.state.userDetails
  const [viewEditor, setViewEditor] = useState(false)
  const [showForm, setShowForm] = useState(true)

  // main invoice data
  const {
    data,
    setData,
    handleChange,
    handleLineItemChange,
    handleFinalise,
    handleLineItemDelete,
  } = useInvoiceForm()

  // invoice actions
  const {
    handleEncrypt,
    handleSend,
    handleDownload,
    handleSelectLanguage,
    language,
  } = useInvoiceActions(data, token, handleFinalise)

  //user data
  useUserData(userDetails, token, setData)
  // customer data
  const [customers, handleCustomerChange, handleModalSubmit, selectedCustomer] =
    useCustomerData(token, setData)

  // modals
  const { isModalOpen: isEncryptModalOpen, toggleModal: toggleEncryptModal } =
    useModal()
  const { isModalOpen: isClientModalOpen, toggleModal: toggleClientModal } =
    useModal()

  const theme = useCheckTheme()

  return (
    <div className="min-h-screen bg-gray-200 mt-4  dark:bg-main-dark-bg ">
      <ToastContainer
        position="top-center"
        theme={theme}
        autoClose={3000}
        hideProgressBar={true}
        closeButton={true}
        toastClassName="text-main-table dark:border-1 border-red-200 font-bold rounded-lg h-auto w-96 p-2 dark:bg-main-dark-bg dark:text-white "
      />

      <nav className="grid border-3  border-color grid-cols-3 sticky top-0 px-8 rounded-md dark:text-white ">
        <LanguageSelector
          language={language}
          handleSelectLanguage={handleSelectLanguage}
        />

        <div className="flex items-center justify-center text-main-table h-full dark:text-white font-bold">
          Inv: {data.invoiceNumber}
        </div>

        <div className="flex justify-end items-center pl-3 h-full text-main-table  dark:text-white">
          <div
            className=" flex h-full items-center border-none 
                      dark:bg-main-dark-bg dark:text-white 
                      dark:shadow-main-purple  hover:bg-violet-900
                      dark:hover:text-white hover:text-gray-200 
                        hover:ease-linear hover:cursor-pointer 
                        hover:transition-all hover:duration-300
                        dark:hover:rounded-none p-2 "
          >
            <button
              className=""
              onClick={() => {
                setViewEditor(true)
                setShowForm(false)
              }}
            >
              Edit
            </button>
          </div>
          <div
            className=" flex h-full items-center border-none 
                      dark:bg-main-dark-bg dark:text-white 
                      dark:shadow-main-purple hover:hover:bg-violet-900
                      dark:hover:text-white hover:text-gray-200 
                        hover:ease-linear hover:cursor-pointer 
                        hover:transition-all hover:duration-300
                        dark:hover:rounded-none p-2"
            //  onClick={handlePreview}
          >
            <span className="">Preview</span>
            <HiOutlineDocumentSearch className="ml-2" />
          </div>
        </div>
      </nav>
      {viewEditor && (
        <div className="flex flex-col">
          <XMLEditor invoice={generateInvoice(data)} />
          <button
            className="bg-main-purple text-white rounded-md hover:bg-violet-900 ml-[90%] h-7 w-32"
            onClick={() => {
              setViewEditor(false)
              setShowForm(true)
            }}
          >
            Close
          </button>
        </div>
      )}
      {showForm ? (
        <div className="container">
          <div className="grid grid-cols-12 px-20">
            <div
              className="bg-gray-300 h-12 col-span-2 p-4 shadow-md shadow-shadow-purple text-main-table flex items-center justify-start rounded-l-md
                          dark:bg-main-table dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color
          "
            >
              <div className="flex">Client</div>
            </div>
            <div
              className=" h-12 col-span-10 p-4 shadow-md shadow-shadow-purple flex items-center justify-start rounded-r-md
                            dark:bg-main-dark-bg dark:text-white dark:shadow-sm dark:shadow-main-purple  border-1 border-color"
            >
              <div className="relative w-full">
                {/* Use the SearchableDropdown component */}
                <SearchableDropdown
                  options={customers}
                  onChange={handleCustomerChange}
                  value={selectedCustomer}
                  placeholder={
                    selectedCustomer ? selectedCustomer : 'Select a customer'
                  }
                />
                <div>
                  <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                    onClick={toggleClientModal}
                  >
                    <BsPlusSquare className="text-gray-500 text-xl hover:text-main-purple dark:hover:text-main-purple dark:text-white rounded-sm" />
                  </div>
                  <ClientModal
                    isOpen={isClientModalOpen}
                    closeModal={toggleClientModal}
                    onFormSubmit={handleModalSubmit}
                  />
                </div>
              </div>
            </div>
          </div>

          <InvoiceForm formData={data} handleChange={handleChange} />

          <LineItemHeader />
          {data.items.map((item, index) => (
            <LineItem
              key={index}
              index={index}
              data={item}
              onChange={handleLineItemChange}
              handleDelete={handleLineItemDelete}
            />
          ))}

          <TotalAmount
            items={data.items.filter((item) => item.amount > 0)}
            taxRate={data.taxRate}
            discountRate={data.discountRate}
          />
          <div className="w-full border-purple-300 dark:border-main-purple border-t my-4"></div>
          <div className="flex justify-end items-center px-20 gap-2 ">
            <div
              className="p-4 h-8 text-center flex items-center w-auto text-main-table hover:bg-violet-900  border-color border-1 shadow-md  rounded-md hover:text-white dark:text-white hover:dark: shadow-shadow-purple dark:shadow-none ease-linear cursor-pointer 
     transition-all duration-300 "
            >
              Schedule
            </div>

            <div
              className="p-4 h-8 text-center flex items-center w-auto text-main-table hover:bg-violet-900 border-color border-1 shadow-md  rounded-md hover:text-white dark:text-white hover:dark: shadow-shadow-purple dark:shadow-none ease-linear cursor-pointer 
     transition-all duration-300 "
            >
              Recurring
            </div>
            <div
              className="p-4 h-8 text-center flex items-center w-auto text-main-table hover:bg-violet-900 border-color border-1 shadow-md  rounded-md hover:text-white dark:text-white hover:dark: shadow-shadow-purple dark:shadow-none ease-linear cursor-pointer 
     transition-all duration-300 "
              onClick={handleDownload}
            >
              Download
            </div>

            <div
              className="p-4 h-8 text-center flex items-center w-auto text-main-table hover:bg-violet-900 border-color border-1 shadow-md  rounded-md hover:text-white dark:text-white hover:dark: shadow-shadow-purple dark:shadow-none ease-linear cursor-pointer 
     transition-all duration-300 "
              onClick={toggleEncryptModal}
            >
              Create
            </div>
            <EncryptModal
              show={isEncryptModalOpen}
              handleClose={toggleEncryptModal}
              handleEncrypt={handleEncrypt}
            />
            <div
              className="p-4 h-8 text-center flex items-center w-auto
                bg-main-purple text-white hover:bg-violet-900 border-color border-1 shadow-md  rounded-md hover:text-white dark:text-white hover:dark: shadow-shadow-purple dark:shadow-none ease-linear cursor-pointer 
     transition-all duration-300  "
              onClick={handleSend}
            >
              <div
                className="flex justify-between items-center gap-2
            "
              >
                Send
                <IoSend />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full"> </div>
      )}
    </div>
  )
}

export default CreateInvoicePage

// const handleSend = async () => {
//   const invoice = generateInvoice(handleFinalise())
//   // save invoice
//   handleCreateInvoice()
//   // send invoice
//   const pdf = handleMakeIntoPDF

//   try {
//     const api2 = axios.create({
//       baseURL:
//         'http://H13A-SOX-SENDING-API.ap-southeast-2.elasticbeanstalk.com/',
//     })
//     const payload2 = {
//       receiver_email: data.customerData.contactEmail,
//       file_name: data.invoiceNumber + '.xml',
//       xml_data: invoice,
//     }
//     await api2.post('/send/send_invoice', payload2, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     setMessageStatus(true)
//     setMessageText(
//       `Successfully sent invoice to ${data.customerData.contactEmail}`
//     )
//     setMessageKey((prev) => prev + 1)
//   } catch (error) {
//     setMessageStatus(false)
//     setMessageText(`Error: sending email - ${error.message} `)
//     setMessageKey((prev) => prev + 1)
//   }
// }
