export function relativeDateString(dueDateString) {
  const dueDate = new Date(dueDateString)
  const currentDate = new Date()
  const oneDay = 24 * 60 * 60 * 1000

  const daysDifference = Math.round((dueDate - currentDate) / oneDay)

  if (daysDifference === 0) {
    return 'today'
  } else if (daysDifference === 1) {
    return 'tomorrow'
  } else if (daysDifference === -1) {
    return 'yesterday'
  } else if (daysDifference > 1 && daysDifference < 30) {
    return `in ${daysDifference} days`
  } else if (daysDifference < -1 && daysDifference > -30) {
    return `${Math.abs(daysDifference)} days ago`
  } else if (daysDifference >= 30 && daysDifference < 60) {
    return 'in 1 month'
  } else if (daysDifference <= -30 && daysDifference > -60) {
    return '1 month ago'
  } else {
    const monthsDifference = Math.round(daysDifference / 30)
    if (monthsDifference > 0) {
      return `in ${monthsDifference} months`
    } else {
      return `${Math.abs(monthsDifference)} months ago`
    }
  }
}

export function calcluatePaymentTerms(date, dueDate) {
  const oneDay = 24 * 60 * 60 * 1000

  const [year, day, month] = date.split('-')
  const [dueYear, dueDay, dueMonth] = dueDate.split('-')

  const dateObj = new Date(year, month - 1, day)
  const dueDateObj = new Date(dueYear, dueMonth - 1, dueDay)

  const daysDifference = Math.ceil((dueDateObj - dateObj) / oneDay)
  return daysDifference
}

export function today() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  const todaysDate = yyyy + '-' + mm + '-' + dd
  return todaysDate
}
