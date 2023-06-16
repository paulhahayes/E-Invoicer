/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

const PaginationItem = ({ page, currentPage, onPageChange }) => {
  return (
    <button
      onClick={() => onPageChange(page)}
      className={`h-10 text-main-table  hover:text-gray-50 hover:bg-violet-900 dark:text-white
    w-12 ${
      currentPage === page && 'bg-violet-900  dark:hover:text-white text-white '
    }`}
    >
      {page}
    </button>
  )
}

export default PaginationItem
