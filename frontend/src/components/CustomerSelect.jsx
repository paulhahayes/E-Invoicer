import React from 'react'

const CustomerSelect = () => {
  return (
    <div className="container ">
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
              options={customerOptions}
              onChange={handleCustomerChange}
              value={selectedOption}
              placeholder={
                selectedOption ? selectedOption : 'Select a customer'
              }
            />
            <div>
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                onClick={toggleModal}
              >
                <BsPlusSquare className="text-gray-500 text-xl hover:text-main-purple dark:hover:text-main-purple dark:text-white rounded-sm" />
              </div>
              <ClientModal
                isOpen={isModalOpen}
                closeModal={toggleModal}
                onFormSubmit={handleModalSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSelect
