export function generateInvoiceNumber() {
  return Math.random().toString(8).substr(2, 9)
}

export function createEmptyLineItem() {
  return {
    item: '',
    description: '',
    quantity: '',
    price: '',
    amount: 0,
  }
}
export function checkInvoice(form, violations) {
  const requiredFields = [
    { key: 'date', label: 'Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'invoiceNumber', label: 'Invoice Number' },
    { key: 'currency', label: 'Currency' },
  ]
  if (form.customerData === {}) {
    violations.push({
      field: 'customerData',
      message: 'Customer is required',
    })
  }
  requiredFields.forEach((fieldObj) => {
    const fieldValue = form[fieldObj.key]
    if (
      !fieldValue ||
      (typeof fieldValue === 'string' && fieldValue.trim() === '')
    ) {
      violations.push({
        field: fieldObj.key,
        message: `${fieldObj.label} is required`,
      })
    }
  })
}

export function filterItems(items, violations) {
  // remove empty items
  const filteredItems = items.filter((item) => {
    return (
      item.item !== '' &&
      item.description !== '' &&
      item.quantity !== '' &&
      item.price !== ''
    )
  })

  let index = 0

  items.forEach((item) => {
    if (item.item === '') {
      violations.push({ field: `item ${index}`, message: 'Item is required' })
    }
    if (item.description === '') {
      violations.push({
        field: `description ${index}`,
        message: 'Description is required',
      })
    }
    if (item.quantity === '') {
      violations.push({
        field: `quantity ${index}`,
        message: 'Quantity is required',
      })
    }
    if (item.price === '') {
      violations.push({ field: `price ${index}`, message: 'Price is required' })
    }
    index++
  })

  if (filteredItems.length === 0) {
    violations.push({
      field: 'items',
      message: 'At least one complete item is required',
    })
  }

  const modifiedData = { ...items, items: filteredItems }
  return modifiedData
}
