import React from 'react'
import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import PropTypes from 'prop-types'

const Searchbar = ({ onSubmit }) => {
  const [term, setTerm] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    onSubmit(term)
  }

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleFormSubmit} className='flex items-center'>
        <input
          value={term}
          onChange={handleChange}
          className='searchbar-input text-xl'
          placeholder='search'
        />
        <button className='text-2xl' type='submit'>
          <MdSearch />
        </button>
      </form>
    </div>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar
