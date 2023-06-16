/* eslint-disable react/prop-types */
import React from 'react'
import PaginationItem from './PaginationItem'
const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}

const Pagination = ({
  currentPage,
  total,
  limit,
  onPageChange,
  onBack,
  onNext,
}) => {
  const pagesCount = Math.ceil(total / limit)

  const pages = range(1, pagesCount)

  return (
    <div className="bottom-32 flex bg-gray-200 rounded-lg shadow-md shadow-shadow-purple dark:border dark:bg-main-dark-bg  dark:border-main-purple dark:shadow dark:shadow-main-purple">
      <button
        onClick={onBack}
        className="h-10
               px-3 rounded-l-lg hover:bg-violet-900 dark:text-white hover:text-white  text-main-table dark:hover:text-white dark:hover:bg-violet-900"
      >
        Prev
      </button>
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <button
        onClick={onNext}
        className="hover:text-white hover:bg-violet-900
               px-3 rounded-r-lg  text-main-table dark:text-white dark:hover:text-white dark:hover:bg-violet-900"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
