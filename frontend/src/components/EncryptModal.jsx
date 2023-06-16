import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const EncryptInvoiceModal = ({ show, handleClose, handleEncrypt }) => {
  const [encrypt, setEncrypt] = useState(false)
  const [secretKey, setSecretKey] = useState('')

  const onSubmit = () => {
    handleEncrypt(encrypt, secretKey)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Encrypt Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="checkbox"
            label="Encrypt Invoice"
            checked={encrypt}
            onChange={(e) => setEncrypt(e.target.checked)}
          />
          {encrypt && (
            <Form.Group controlId="secretKey">
              <Form.Label>Secret Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter secret key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn-custom" onClick={onSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

EncryptInvoiceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEncrypt: PropTypes.func.isRequired,
}

export default EncryptInvoiceModal
