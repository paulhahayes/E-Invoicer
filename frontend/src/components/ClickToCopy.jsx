import React, { useState } from 'react'
import { FaCopy } from 'react-icons/fa'

// eslint-disable-next-line react/prop-types
function ClickToCopy({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <div>
      <button onClick={handleCopy}>
        {copied ? 'Copied!' : <FaCopy />}
      </button>
    </div>
  )
}

export default ClickToCopy
