import Calendar from '../../components/Calendar'
import React, { useContext } from "react"
import Layout from "../../components/Layout"
import TimeSlotPicker from "../../components/TimeSlotPicker"
import AppointmentSummary from '../../components/AppointmentSummary'

import {BookingContext} from "../../context/BookingContext"
import { NavigationContext } from "../../context/NavigationContext";


const App = ({location}) => { 
const {setPageState} = useContext(NavigationContext);
setPageState(location.pathname);

// need a reference to the chosen service in here
const {selectedService, selectedDateGlobal} = useContext(BookingContext);
//state to tell client if no avail
const {isAvailability, setAvailability} = useContext(BookingContext);
// setting the global slots array
const {slots, setSlots} = useContext(BookingContext);



  return (
    <Layout>
          <Calendar /*action={getAvailabilityForDate}*//>
          <TimeSlotPicker/>
          <AppointmentSummary/>
    </Layout>
  )
}
export default App
