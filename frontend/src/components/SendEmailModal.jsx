import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const SendInvoiceModal = ({
  show,
  handleEmailClose,
  handleSend,
  contactName,
  contactEmail,
  title,
}) => {
  const [message, setMessage] = useState('')

  const onSubmit = () => {
    handleSend(message)
    handleEmailClose()
  }

  return (
    <Modal show={show} onHide={handleEmailClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="contactName">
            <Form.Label>Contact Name</Form.Label>
            <Form.Control type="text" readOnly value={contactName} />
          </Form.Group>
          <Form.Group controlId="contactEmail">
            <Form.Label>Contact Email</Form.Label>
            <Form.Control type="text" readOnly value={contactEmail} />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" readOnly value={title} />
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEmailClose}>
          Close
        </Button>
        <Button className="btn-custom" onClick={onSubmit}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

SendInvoiceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleEmailClose: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  contactName: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default SendInvoiceModal
