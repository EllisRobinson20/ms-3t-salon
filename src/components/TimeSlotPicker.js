import React, {useContext, useEffect} from 'react'
import { BookingContext } from '../context/BookingContext'
import { Link } from 'gatsby';
import * as styles from '../styles/timeSlotPicker.module.css'
import set from "date-fns/set";

export default function TimeSlotPicker() {

    const {slots} = useContext(BookingContext);
    const {setSelectedSlot} = useContext(BookingContext);
    const {setAvailability} = useContext(BookingContext);
    const {selectedDateGlobal, setNewDate} = useContext(BookingContext);
    useEffect(() => {
        console.log("slots was just updated");
        setAvailability(slots.length > 0)
    }, [slots]); 
    
    function selectTimeSlot(e, timeSlot) {
        e.preventDefault()
        setSelectedSlot(timeSlot)
        addTimeToGlobalDate(timeSlot)
    }
    function addTimeToGlobalDate(timeSlot) {
        const hoursMinutes = getHoursAndMinutes(timeSlot.id)
        const dateTime = set(selectedDateGlobal, {hours: hoursMinutes[0], minutes: hoursMinutes[1] })        
        setNewDate(dateTime)
    }
    function getHoursAndMinutes(timeSlot) {
        const hoursMinutesDecimal = timeSlot / 60;
        const hasMinutes = (hoursMinutesDecimal - Math.floor(hoursMinutesDecimal)) !== 0;
        const hours = Math.floor(hoursMinutesDecimal);
        if (hasMinutes) {
            const remainder = hoursMinutesDecimal - Math.floor(hoursMinutesDecimal);
            const minutes = remainder * 60;
            return [hours, minutes]
        } else {
            return [hours, 0]
        }
    }

    return (
        <div className={styles.card}>
            <h1>{ slots.length > 0 ? "Available Slots" : "" }</h1>
            <div className={styles.btnSection}>
            { slots.map(timeSlot => (
                
                    <Link className={styles.btn}  to={"." } key={timeSlot.id} onClick={(e) => {selectTimeSlot(e, timeSlot)} }>
                                {timeSlot.buttonLabel} 
                            </Link>
                
            ))}
            </div>
        </div>
    )
}


// show all given time slots in here using this array map method on all returned items

// ideally in this file the global date could be set with the chosen time