/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
const Table = ({ data, config, keyFn, className }) => {
  const tableClassName = `min-w-full divide-y divide-gray-200 ${className} dark:bg-main-dark-bg dark:text-white dark:border dark:border-main-purple dark:shadow dark:shadow-main-purple`

  const renderedConfig = config.map((column) => (
    <th
      key={column.label}
      className='px-4 py-2 border bg-main-purple text-left text-sm font-medium text-white uppercase tracking-wider dark:text-white dark:border-none dark:shadow-lg dark:shadow-main-purple dark:bg-secondary-dark-bg'
    >
      {column.label}
    </th>
  ))

  const renderedRows = data.map((row, index) => {
    const rowClassName =
      index % 2 === 0
        ? 'bg-white dark:bg-main-dark-bg'
        : 'bg-white dark:bg-table-dark-bg'

    // FUNCTION
    const renderedCells = config.map((column) => (
      <td
        key={column.label}
        className={`px-4 py-2 whitespace-nowrap text-sm text-main-table  dark:text-white dark:border dark:bg-main-dark-bg dark:border-main-purple `}
      >
        {column.render(row)}
      </td>
    ))

    return (
      <tr
        key={keyFn(row)}
        className={`${rowClassName} dark:text-gray-200 border-b border-gray-200`}
      >
        {renderedCells}
      </tr>
    )
  })

  return (
    <div className='p-4 '>
      <div className='shadow-md shadow-shadow-purple  dark:shadow dark:shadow-main-purple sm:rounded-lg'>
        <table className={tableClassName}>
          <thead className='bg-gray-50'>
            <tr>{renderedConfig}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
