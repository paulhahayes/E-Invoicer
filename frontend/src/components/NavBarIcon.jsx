import React from 'react'
import PropTypes from 'prop-types'

const NavBarIcon = ({ icon, text }) => {
  return (
    <div className="flex flex-auto items-center justify-between m-3">
      {text}
      {icon}
    </div>
  )
}

NavBarIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}

export default NavBarIcon
