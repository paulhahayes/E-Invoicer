import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { useDarkModeContext } from '../contexts/DarkModeContext'

const SearchableDropdown = ({ options, onChange, placeholder }) => {
  const { enabled } = useDarkModeContext()
  const [darkMode, setDarkMode] = useState(enabled)

  useEffect(() => {
    setDarkMode(enabled)
  }, [enabled])

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode
        ? '#20232A'
        : 'rgba(229, 231, 235, var(--tw-bg-opacity))',
      border: 'none',
      marginRight: '3rem',
      '&:hover': {
        cursor: 'pointer',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode
        ? '#26264c'
        : 'rgba(229, 231, 235, var(--tw-bg-opacity))',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? darkMode
          ? '#33373E'
          : '#C8B8DB'
        : darkMode
        ? '#26264c'
        : 'white',
      color: darkMode ? '#F9FAFB' : '#4F4D4D',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? '#F9FAFB' : '#4F4D4D',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: darkMode ? '#F9FAFB' : '#4F4D4D',
      '&:hover': {
        color: '#A31AF8',
        cursor: 'pointer',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: 'red',
    }),
  }

  return (
    <Select
      options={options}
      onChange={onChange}
      styles={customStyles}
      placeholder={placeholder}
    />
  )
}

SearchableDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default SearchableDropdown
