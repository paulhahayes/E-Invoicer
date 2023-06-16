/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
export const config = [
  {
    label: 'Supplier',
    dataIndex: 'client',
    render: (invoice) => (
      <div>
        <div className='font-bold text-lg'>{invoice.supplier}</div>
        <div>{invoice.invoiceId}</div>
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
        <div className='font-bold'>${invoice.amount}</div>
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
          className: 'bg-green-500',
        },
        {
          label: 'Pending',
          value: 'Pending',
          className: 'bg-yellow-500',
        },
        {
          label: 'Overdue',
          value: 'Overdue',
          className: 'bg-red-400',
        },
      ]
      return (
        <DropDown
          options={items}
          value={selected[invoice.invoiceId]}
          defaultValue={items.find(
            (item) => item.value === invoice.status
          )}
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (invoice) => <button>View</button>,
  },
]
