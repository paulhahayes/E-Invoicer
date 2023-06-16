/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import RadialChart from '../components/RadialChart'
import api from '../utils/api'
import { useState, useEffect } from 'react'

const AnalyticsPage = () => {
  const token = localStorage.getItem('e-invoice-token')
  const API = api(process.env.REACT_APP_API_URL)
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseInvoices, setPurchaseInvoices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [salesInvoices, setSalesInvoices] = useState([])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const results = await API.get(
          '/invoice/retrieveComapanyInvoices/',
          {
            headers: { token: token },
            params: {
              filter: 'suppliers',
              offset: (currentPage - 1) * 15,
              quantity: 15,
            },
          }
        )

        const invoicesData = results.data.invoices
        setSalesInvoices(invoicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentPage, token])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const results = await API.get(
          '/invoice/retrieveComapanyInvoices/',
          {
            headers: { token: token },
            params: {
              filter: 'customers',
              offset: (currentPage - 1) * 15,
              quantity: 15,
            },
          }
        )

        const invoicesData = results.data.invoices
        setPurchaseInvoices(invoicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, token])

  let balance = 0;
  let income = 0;
  let expenses = 0;
  let numberOfSalesInvoices = 0;
  let numberOfPurchaseInvoices = 0;
  let tax = 0;
  let highestAmountReceived = 0;
  let highestAmountPaid = 0;
  let totalTransactions = 0;
  let overdue = 0
  let pending = 0
  let paid = 0

  purchaseInvoices.forEach((invoice) => {
    expenses += invoice.amount
    numberOfPurchaseInvoices += 1
    tax += invoice.tax
    if (invoice.amount > highestAmountPaid) {
      highestAmountPaid = invoice.amount
    }
    console.log(invoice.status)
    if (invoice.status == 'Overdue') {
      overdue += 1
    }
    if (invoice.status == 'Pending') {
      pending += 1
    }
    if (invoice.status == 'Paid') {
      paid += 1
    }
  })

  salesInvoices.forEach((invoice) => {
    income += invoice.amount
    numberOfSalesInvoices += 1
    tax += invoice.tax
    if (invoice.amount > highestAmountReceived) {
      highestAmountReceived = invoice.amount
    }
    if (invoice.status === 'Overdue') {
      overdue += 1
    }
    if (invoice.status === 'Pending') {
      pending += 1
    }
    if (invoice.status === 'Paid') {
      paid += 1
    }
  })


  balance = income - expenses
  totalTransactions = numberOfSalesInvoices + numberOfPurchaseInvoices

  let percentOverdue = (overdue / totalTransactions) * 100
  let percentPending = (pending / totalTransactions) * 100
  let percentPaid = (paid / totalTransactions) * 100

  
  return <div className='h-[100%] pb-20 mt-3'>
    <div className='flex justify-between h-1/3'>
      <div className='bg-[#D5B4FF] w-1/3 m-3 analytics flex flex-col pt-[55px] pl-4'> 
        <p className='font-bold text-[20px]'>Balance</p>
        <p className='text-[15px] font-bold mt-[-12px]'>Most recent</p>
        <p className='text-4xl font-extrabold mt-[-10px]'>${balance.toFixed(2)}</p>  
      </div>
      <div className='bg-[#D4FFBA] w-1/3 m-3 analytics flex flex-col pt-[55px] pl-4'> 
        <p className='font-bold text-[20px]'>Income</p>
        <p className='text-[15px] font-bold mt-[-12px]'>Most recent</p>
        <p className='text-4xl font-extrabold mt-[-10px]'>${income.toFixed(2)}</p>  
      </div>
      <div className='bg-[#FCB1B1] w-1/3 m-3 analytics flex flex-col pt-[55px] pl-4'> 
        <p className='font-bold text-[20px]'>Expenses</p>
        <p className='text-[15px] font-bold mt-[-12px]'>Most recent</p>
        <p className='text-4xl font-extrabold mt-[-10px]'>${expenses.toFixed(2)}</p>  
      </div>
    </div>
    <div className='h-2/3 flex justify-between'>
      <div className='flex flex-col w-1/3 m-3'>
        <div className='analytics w-full h-1/2 mb-10'>
          <p className='pt-3 pl-4 text-[20px] font-bold'>Sales Invoices</p>
          <p className='pt-2 pl-4 text-5xl font-bold text-green-800'>{numberOfSalesInvoices}</p>
        </div>
        <div className='analytics w-full h-1/2'>
          <p className='pt-3 pl-4 text-[20px] font-bold'>Purchase Invoices</p>
          <p className='pt-2 pl-4 text-5xl font-bold text-green-800'>{numberOfPurchaseInvoices}</p>
        </div>
      </div>
      <div className='analytics w-1/3 m-3 dark:text-white'>
        <RadialChart overdue={percentOverdue} pending={percentPending} paid={percentPaid}/>
      </div>
      <div className='analytics w-1/3 m-3 p-4'>
        <p className='text-2xl font-bold text-main-purple'> Some Highlights </p>
        <div className='mt-8'>
          <div className='flex flex-row mb-2'>
            <p className='text-lg font-medium'> Amount spent on taxes: </p>
            <p className='text-lg font-extrabold ml-2 text-red-800'> ${tax.toFixed(2)} </p>
          </div>
          <div className='flex flex-row mb-2'>
            <p className='text-lg font-medium'> Highest amount received: </p>
            <p className='text-lg font-extrabold ml-2 text-green-800'> ${highestAmountReceived} </p>
          </div>
          <div className='flex flex-row mb-2'>
            <p className='text-lg font-medium'> Highest amount paid: </p>
            <p className='text-lg font-extrabold ml-2 text-red-800'> ${highestAmountPaid} </p>
          </div>
          <div className='flex flex-row mb-2'>
            <p className='text-lg font-medium'> Total transactions: </p>
            <p className='text-lg font-extrabold ml-2'> {totalTransactions} </p>
          </div>
          <div className='flex flex-row mb-2'>
            <p className='text-lg font-medium'> Most used currency: </p>
            <p className='text-lg font-extrabold ml-2'> AUD </p>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default AnalyticsPage
