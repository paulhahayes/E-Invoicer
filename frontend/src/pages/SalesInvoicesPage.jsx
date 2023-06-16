/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Table from '../components/Table'
import DropDown from '../components/DropDown'
import Pagination from '../components/Pagination'
import { relativeDateString } from '../utils/dates'
import { updateStatus } from '../utils/updateInvoiceStatus'
import InvoicePdf from '../components/InvoicePdf'
import { AiFillDelete } from 'react-icons/ai'
import InvoiceDetails from '../components/InvoiceDetails'
import InvoiceDelete from '../components/invoiceDelete'
import api from '../utils/api'

const PurchaseInvoicesPage = () => {
  const token = localStorage.getItem('e-invoice-token')
  const API = api(process.env.REACT_APP_API_URL)
  const [isLoading, setIsLoading] = useState(true)
  const [invoices, setInvoices] = useState([])
  const [selected, setSelected] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalInvoices, setTotalInvoices] = useState(0)
  const [viewInvoiceDetails, setViewInvoiceDetails] = useState(false)
  const [viewInvoiceDelete, setInvoiceDelete] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState({})
  const [viewInvoicePdf, setViewInvoicePdf] = useState(false)

  const handleNextClick = () => {
    if (currentPage === Math.ceil(totalInvoices / 15)) return
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleBackClick = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1)
  }

  const [trigger, setTrigger] = useState(false)
  const handleTrigger = () => {
    setTrigger(!trigger)
  }

  // get the data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const results = await API.get('/invoice/retrieveComapanyInvoices/', {
          headers: { token: token },
          params: {
            filter: 'suppliers',
            offset: (currentPage - 1) * 15,
            quantity: 15,
          },
        })

        const invoicesData = results.data.invoices
        setInvoices(invoicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    async function fetchCount() {
      try {
        const results = await API.get(
          // MAYBE BUGGY
          '/invoice/retrieveComapanyInvoicesCount/',
          {
            headers: { token: token },
            params: {
              filter: 'suppliers',
            },
          }
        )
        const invoicesCount = results.data.count
        setTotalInvoices(invoicesCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    fetchCount()
  }, [currentPage, token, trigger])

  const config = [
    {
      label: 'Supplier',
      dataIndex: 'client',
      render: (invoice) => (
        <div>
          <div className="font-bold text-lg">{invoice.supplier}</div>
          <div>Id: {invoice.invoiceId}</div>
        </div>
      ),
    },
    {
      label: 'Issue Date',
      dataIndex: 'issueDate',
      render: (invoice) => invoice.issueDate,
    },
    {
      label: 'Due Date',
      dataIndex: 'dueDate',
      render: (invoice) => relativeDateString(invoice.dueDate),
    },
    {
      label: 'Amount',
      dataIndex: 'amount',
      render: (invoice) => (
        <div>
          <div className="text-lg">${invoice.amount}</div>
          <div>{invoice.currency}</div>
        </div>
      ),
    },
    {
      label: 'Status',
      dataIndex: 'status',
      // will use later
      render: (invoice) => {
        const items = [
          {
            label: 'Paid',
            value: 'Paid',
            className: 'bg-paid-green rounded-full text-paid',
          },
          {
            label: 'Pending',
            value: 'Pending',
            className: 'bg-pending-yellow rounded-full text-pending',
          },
          {
            label: 'Overdue',
            value: 'Overdue',
            className: 'bg-unpaid-red rounded-full text-over-due',
          },
        ]
        return (
          <DropDown
            options={items}
            value={selected[invoice.invoiceId]}
            defaultValue={items.find((item) => item.value === invoice.status)}
            onChange={(option) => {
              setSelected((prevSelected) => ({
                ...prevSelected,
                [invoice.invoiceId]: option,
              }))
              updateStatus(invoice.invoiceId, option, token)
            }}
          />
        )
      },
    },
    {
      label: 'Actions',
      dataIndex: 'id',
      render: (invoice) => (
        <div className="flex justify-start">
          <button
            className="text-[14.7px]"
            onClick={() => {
              setViewInvoiceDetails(true)
              setCurrentInvoice(invoice)
            }}
          >
            View
          </button>
          {viewInvoiceDetails && (
            <InvoiceDetails
              invoice={currentInvoice}
              closeInvoice={() => setViewInvoiceDetails(false)}
            />
          )}
          <button
            onClick={() => {
              setViewInvoicePdf(true)
              setCurrentInvoice(invoice)
            }}
            className=""
          >
            <InvoicePdf invoice={currentInvoice} className="" />
          </button>
          <button
            onClick={() => {
              setInvoiceDelete(true)
              setCurrentInvoice(invoice)
            }}
          >
            <AiFillDelete className="h-[18px] w-[18px] -translate-x-24" />
          </button>
          {viewInvoiceDelete && (
            <InvoiceDelete
              invoice={currentInvoice}
              closeInvoice={() => setInvoiceDelete(false)}
              handleTrigger={handleTrigger}
            />
          )}
        </div>
      ),
    },
  ]
  const keyFn = (invoice) => {
    return invoice.invoiceId
  }

  if (isLoading) {
    return (
      <div>
        <div className="w-full">
          <Table config={config} data={[]}></Table>
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div>
        <div className="w-full">
          <Table config={config} data={[]}></Table>
          <div className="text-center text-gray-500">No data available.</div>
          <div className="flex justify-center items-center">
            <Pagination
              className="mt-14"
              currentPage={currentPage}
              total={totalInvoices}
              limit={15}
              onPageChange={(page) => setCurrentPage(page)}
              onNext={handleNextClick}
              onBack={handleBackClick}
            ></Pagination>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full ">
      <Table
        data={invoices}
        config={config}
        keyFn={keyFn}
        className="rounded-full"
      />
      <div className="flex justify-center items-center">
        <Pagination
          className="mt-14"
          currentPage={currentPage}
          total={totalInvoices}
          limit={15}
          onPageChange={(page) => setCurrentPage(page)}
          onNext={handleNextClick}
          onBack={handleBackClick}
        ></Pagination>
      </div>
    </div>
  )
}

export default PurchaseInvoicesPage
