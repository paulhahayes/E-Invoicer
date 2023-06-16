import { useState } from 'react'
import axios from 'axios'
import api from '../utils/api'
const API = api(process.env.REACT_APP_API_URL)
import { generateInvoice } from '../utils/generateInvoice'

import { toast } from 'react-toastify'

export const useInvoiceActions = (data, token, handleFinalise) => {

  
  const [language, setLanguage] = useState('en')



  const handleSelectLanguage = (event) => {
    setLanguage(event.target.value)
  }

  const handleCreateInvoice = async () => {
    const staging = handleFinalise()
    if (!staging) {
      return
    }
    const invoice = generateInvoice(staging)

    try {
      await API.post('/invoice/store/v3', invoice, {
        headers: { token: token, 'Content-Type': 'text/plain' },
      })
      toast.success(`Invoice ID: ${data.invoiceNumber}`)
    } catch (error) {
      toast.error(`Error: Malformed invoice`)
    }
  }

  const handleEncrypt = async (encrypt, secretKey) => {
    const staging = handleFinalise()
    if (!staging) {
      return
    }
    const invoice = generateInvoice(staging)
    try {
      let response
      if (encrypt) {
        response = await API.post(
          `/invoice/encrypt?secretKey=${secretKey}`,
          invoice,
          {
            headers: {
              token: token,
              'Content-Type': 'text/plain',
            },
          }
        )
      } else {
        response = await API.post('/invoice/store/v3', invoice, {
          headers: { token: token, 'Content-Type': 'text/plain' },
        })
      }

      toast.success(`Invoice ID: ${data.invoiceNumber}`)
    } catch (error) {
      const messages = error.response.data.message
      const feedBack = messages
        .map((msg) => `Line ${msg.line}: ${msg.message}`)
        .join('\n\t')

      toast.error(`Error: ${feedBack}`)
    }
  }

  const handleSend = async () => {
    const staging = handleFinalise()
    if (!staging) {
      return
    }
    console.log('staging', staging)
    const invoice = generateInvoice(staging)
    // const pdf = handleMakeIntoPDF
    // if (!pdf) {
    //   return
    // }
    // try {
    //   setMessageStatus(true)
    //   setMessageText(
    //     `Successfully sent invoice to ${data.customerData.contactEmail}`
    //   )
    //   setMessageKey((prev) => prev + 1)
    // } catch (error) {
    //   setMessageStatus(false)
    //   setMessageText(`Error: sending email - ${error.message} `)
    //   setMessageKey((prev) => prev + 1)
    // }
  }

  const handleDownload = async () => {
    // Download the PDF file
    const pdfBlob = await handleMakeIntoPDF()
    const pdfURL = URL.createObjectURL(pdfBlob)
    const tempLink = document.createElement('a')
    tempLink.href = pdfURL
    tempLink.setAttribute('download', data.invoiceNumber + '.pdf')
    tempLink.style.display = 'none'
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  }

  
  const handleMakeIntoPDF = async () => {
    let invoice = generateInvoice(handleFinalise())
    const apiKey = 'e44288b23c7e49909ef545ae32368327'
    const api = axios.create({
      baseURL: 'https://macroservices.masterofcubesau.com/api/v3/',
    })
    invoice = invoice.replace(/"/g, "'")
    const payload = {
      ubl: invoice,
      style: 0,
      language,
    }
    try {
      const results = await api.post('/invoice/render/pdf', payload, {
        responseType: 'arraybuffer', // This line is important to receive PDF data
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
      })

      const pdfBlob = new Blob([results.data], { type: 'application/pdf' })
      return pdfBlob
    } catch (error) {
      toast.error(`Error: Unable to generate formatted PDF`)
    }
  }
  return {
    handleEncrypt,
    handleSend,
    handleDownload,
    handleCreateInvoice,
    handleSelectLanguage,
    handleMakeIntoPDF,
  }
}
