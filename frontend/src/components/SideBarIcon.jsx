import React from 'react'
import PropTypes from 'prop-types'

const SideBarIcon = ({ icon, text, isActive }) => {
  return (
    <div
      className={`sidebar-icon group ${isActive ? 'sidebar-icon-active' : ''}`}
    >
      {icon}
      {text && (
        <span className="sidebar-text group-hover:scale-100 z-50"> {text}</span>
      )}
    </div>
  )
}

SideBarIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}

export default SideBarIcon
