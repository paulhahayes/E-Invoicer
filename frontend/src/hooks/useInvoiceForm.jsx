import { useState } from 'react'
import { today, calcluatePaymentTerms } from '../utils/dates'
import { toast } from 'react-toastify'

import {
  generateInvoiceNumber,
  createEmptyLineItem,
  checkInvoice,
  filterItems,
} from '../utils/invoice'

export const useInvoiceForm = () => {
  const initialData = {
    invoiceNumber: generateInvoiceNumber(),
    date: today(),
    dueDate: '',
    userData: {},
    customerData: {},
    currency: 'AUD',
    discountRate: 0,
    taxRate: 10,
    taxScheme: 'GST',
    paymentTerms: '',
    notes: '',
    items: [createEmptyLineItem()],
  }
  const [data, setData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleLineItemChange = (index, updatedItem) => {
    setData((prevData) => {
      const newItems = [...prevData.items]
      newItems[index] = updatedItem
      return { ...prevData, items: [...newItems] }
    })

    if (index === data.items.length - 1) {
      checkForNewLineItem()
    }
  }

  const handleFinalise = () => {
    // Check for errors
    let violations = []
    checkInvoice(data, violations)
    const paymentTerms = calcluatePaymentTerms(data.date, data.dueDate)
    setData((prevData) => ({
      ...prevData,
      paymentTerms: paymentTerms,
    }))

    const filteredItems = filterItems(data.items, violations)
    const modifiedData = { ...data, items: filteredItems }

    if (violations.length > 0) {
      // toast.error(violations.join('\n'))\
      toast.error('(╯°□°）╯︵ ┻━┻\nError: Malformed invoice')
      return
    }
    return modifiedData
  }

  const checkForNewLineItem = () => {
    const lastItem = data.items[data.items.length - 1]
    const hasInput = Object.values(lastItem).some((value) => value !== '')

    if (hasInput) {
      setData((prevData) => ({
        ...prevData,
        items: [...prevData.items, createEmptyLineItem()],
      }))
    }
  }

  const handleLineItemDelete = (index) => {
    if (data.items.length === 1) {
      return
    }
    setData((prevData) => {
      const newItems = [...prevData.items]
      newItems.splice(index, 1)
      return { ...prevData, items: newItems }
    })
  }

  const handleBuildXml = (xmlData) => {
    // takes the xml string 
    // any changes to the fields get updated
    // the xml string is kept
    // xmltoJs


  }

  return {
    data,
    setData,
    handleChange,
    handleLineItemChange,
    handleFinalise,
    handleLineItemDelete,
  }
}
