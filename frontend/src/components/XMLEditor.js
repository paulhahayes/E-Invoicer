import Editor from '@monaco-editor/react'
import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import InvoicePdf from './InvoicePdf'

function XMLEditor({ invoice, isDarkMode }) {
  const [code, setCode] = useState(invoice)

  function handleEditorChange(value) {
    setCode(value)
  } 

  const theme = isDarkMode ? 'vs-dark' : 'vs'
  return (
    <div className="mt-3">
      <Editor language="xml" height="60vh" value={code} onChange={handleEditorChange} theme={theme} />
      <InvoicePdf invoice={code} />
    </div>
  )
}

XMLEditor.propTypes = {
  invoice: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool,
}

export default XMLEditor
