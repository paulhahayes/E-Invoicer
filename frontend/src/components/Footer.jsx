import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white text-center py-4 mt-4'>
      <p>
        &copy; {new Date().getFullYear()} Cheesecake. All rights
        reserved.
      </p>
    </footer>
  )
}

export default Footer
