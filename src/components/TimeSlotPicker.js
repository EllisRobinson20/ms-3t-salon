import React, { useContext, useEffect } from 'react'
import { BookingContext } from '../context/BookingContext'
import { Link } from 'gatsby'
import * as styles from '../styles/timeSlotPicker.module.css'
import set from 'date-fns/set'

export default function TimeSlotPicker() {
  // context
  const { slots } = useContext(BookingContext)
  const { setSelectedSlot } = useContext(BookingContext)
  const { setAvailability } = useContext(BookingContext)
  const { selectedDateGlobal, setNewDate } = useContext(BookingContext)
  // functions
  function selectTimeSlot(e, timeSlot) {
    e.preventDefault()
    setSelectedSlot(timeSlot)
    addTimeToGlobalDate(timeSlot)
  }
  function addTimeToGlobalDate(timeSlot) {
    const hoursMinutes = getHoursAndMinutes(timeSlot.id)
    const dateTime = set(selectedDateGlobal, {
      hours: hoursMinutes[0],
      minutes: hoursMinutes[1],
    })
    setNewDate(dateTime)
  }
  function getHoursAndMinutes(timeSlot) {
    const hoursMinutesDecimal = timeSlot / 60
    const hasMinutes =
      hoursMinutesDecimal - Math.floor(hoursMinutesDecimal) !== 0
    const hours = Math.floor(hoursMinutesDecimal)
    if (hasMinutes) {
      const remainder = hoursMinutesDecimal - Math.floor(hoursMinutesDecimal)
      const minutes = remainder * 60
      return [hours, minutes]
    } else {
      return [hours, 0]
    }
  }
  // side effects
  useEffect(() => {
    console.log('slots was just updated, avaiability', slots.length > 0)
    setAvailability(slots.length > 0)
  }, [slots])
  return (
    <div className={styles.card}>
      <h1>{slots.length > 0 ? 'Available Slots' : ''}</h1>
      <div className={styles.btnSection}>
        {slots.map(timeSlot => (
          <Link
            className={styles.btn}
            to={'.'}
            key={timeSlot.id}
            onClick={e => {
              selectTimeSlot(e, timeSlot)
            }}
          >
            {timeSlot.buttonLabel}
          </Link>
        ))}
      </div>
    </div>
  )
}
