import Calendar from '../../components/Calendar'
import React, { useContext } from "react"
import { Link } from 'gatsby'
import Layout from "../../components/Layout"
import TimeSlotPicker from "../../components/TimeSlotPicker"
import AppointmentSummary from '../../components/AppointmentSummary'
import firebase from "firebase"
import {BookingContext} from "../../context/BookingContext"
import { NavigationContext } from "../../context/NavigationContext";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const App = ({location}) => { 
const {setPageState} = useContext(NavigationContext);
setPageState(location.pathname);

// need a reference to the chosen service in here
const {selectedService, selectedDateGlobal} = useContext(BookingContext);
//state to tell client if no avail
const {isAvailability, setAvailability} = useContext(BookingContext);
// setting the global slots array
const {slots, setSlots} = useContext(BookingContext);
// last page state for the back button
const {lastPage} = useContext(NavigationContext);

const getAvailabilityForDate = (day) => {
const availability = firebase.functions().httpsCallable('getAvailabilityForDate');
availability({date: day, serviceName: selectedService })
.then( result => {setSlots(result.data)
})
};

  return (
    <Layout>
      <Grid container>
        <Grid item xs={1}>
        <Link to={lastPage}>
          <IconButton href={lastPage} color="textSecondary" aria-label="upload picture" component="span">
          <ArrowBackIcon/>
          </IconButton>
        </Link>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4">
            Select date for availability
          </Typography>
        </Grid>
        <Grid item xs={1}>

        </Grid>
      </Grid>
      
      <Calendar /*action={getAvailabilityForDate}*//>
      <TimeSlotPicker/>
      <AppointmentSummary/>
    </Layout>
  )
}
export default App
