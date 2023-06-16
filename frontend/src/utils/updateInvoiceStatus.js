import api from './api'
export const updateStatus = async (invoiceId, newStatus, token) => {
  const API = api(process.env.REACT_APP_API_URL)
  try {
    const response = await API.put(
      `/invoice/updateStatus/${invoiceId}`,
      { status: newStatus.value },
      { headers: { token: token } }
    )
    console.log('Status updated:', response.data)
  } catch (error) {
    console.error('Error updating status:', error)
  }
}
