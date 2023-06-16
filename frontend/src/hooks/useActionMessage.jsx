import { useState } from 'react'

const useActionMessage = () => {
  const [messageStatus, setMessageStatus] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [messageKey, setMessageKey] = useState(0)
  const [isMessageVisible, setIsMessageVisible] = useState(false)

  const updateMessage = (status, text, isVisible) => {
    setMessageStatus(status)
    setMessageText(text)
    setMessageKey((prev) => prev + 1)
    setIsMessageVisible(isVisible)
  }

  const closeMessage = () => {
    setIsMessageVisible(false)
  }

  return {
    messageStatus,
    messageText,
    messageKey,
    isMessageVisible,
    updateMessage,
    closeMessage,
  }
}

export default useActionMessage
