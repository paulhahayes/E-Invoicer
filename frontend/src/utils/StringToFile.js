import FormData from 'form-data'
export function generateXML(str, name) {
  // replace all '"' with "'"
  str = str.replace(/"/g, "'")
  // create form data
  const formData = new FormData()
  formData.append('file', Buffer.from(str), {
    filename: name + '.xml',
    contentType: 'application/xml',
  })
  return formData
}
