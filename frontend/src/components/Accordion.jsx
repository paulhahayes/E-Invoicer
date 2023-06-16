/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { GoChevronDown, GoChevronRight } from 'react-icons/go'
// eslint-disable-next-line react/prop-types
function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const handleClick = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(-1)
    } else {
      setExpandedIndex(index)
    }
  }

  const renderItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex
    const icon = (
      <span>
        {isExpanded ? <GoChevronDown /> : <GoChevronRight />}
      </span>
    )
    return (
      <div key={item.id}>
        <div
          className='flex p-3 justify-between bg-gray-50 border-b items-center cursor-pointer'
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && (
          <div className='border-b p-5'>{item.content}</div>
        )}
      </div>
    )
  })
  return (
    <div className='w-15%  min-h-screen border-x border-t rounded'>
      {renderItems}
    </div>
  )
}

export default Accordion
