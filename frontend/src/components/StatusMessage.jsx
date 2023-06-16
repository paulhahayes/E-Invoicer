import React from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const StatusMessage = ({ show, status, message, onClose }) => {
  return (
    <>
      {show && (
        <Alert
          variant={status ? 'success' : 'danger'}
          onClose={onClose}
          dismissible
        >
          <Alert.Heading>{status ? 'Success' : 'Error'}</Alert.Heading>
          <pre>{message}</pre>
        </Alert>
      )}
    </>
  )
}

StatusMessage.propTypes = {
  show: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default StatusMessage
