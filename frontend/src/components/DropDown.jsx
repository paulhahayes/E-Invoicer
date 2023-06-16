/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import { GoChevronDown, GoChevronRight } from 'react-icons/go'
import Panel from './Panel'

const DropDown = ({ options, value, onChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const divEl = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) return
      if (!divEl.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handler, true)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (option) => {
    onChange(option)
    setIsOpen(false)
  }
  const renderOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-blue-100 p-1 cursor-pointer hover:text-gray-900 text-gray-500 text-md 
        text-center border "
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    )
  })

  const styles = value?.className || defaultValue?.className || ''
  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className={`flex justify-center  items-center cursor-pointer p-2 font-bold text-main-table text-lg ${styles}`}
        onClick={handleClick}
      >
        {value?.label || defaultValue?.label || 'Select'}
        {isOpen ? <GoChevronRight /> : <GoChevronDown />}
      </Panel>
      {isOpen && <Panel className="relative flex-col">{renderOptions}</Panel>}
    </div>
  )
}

export default DropDown
