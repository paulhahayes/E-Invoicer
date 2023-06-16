// import React, { useState, useEffect } from 'react'
// import Modal from 'react-modal'
// import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

// Modal.setAppElement('#root')

// const CalendarModal = ({ onDateSelected, initialDate, open, setOpen }) => {
//   const [selectedDate, setSelectedDate] = useState(initialDate)

//   useEffect(() => {
//     if (initialDate) setSelectedDate(initialDate)
//   }, [initialDate])

//   const currentDate = new Date()
//   const daysInMonth = eachDayOfInterval({
//     start: startOfMonth(currentDate),
//     end: endOfMonth(currentDate),
//   })

//   const handleDateClick = (date) => {
//     setSelectedDate(date)
//     onDateSelected(date)
//     setOpen(false)
//   }

//   const renderDays = () => {
//     return daysInMonth.map((date, index) => (
//       <button key={index} onClick={() => handleDateClick(date)}>
//         {format(date, 'd')}
//       </button>
//     ))
//   }

//   return (
//     <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
//       <div className="calendar">{renderDays()}</div>
//     </Modal>
//   )
// }

// export default CalendarModal
