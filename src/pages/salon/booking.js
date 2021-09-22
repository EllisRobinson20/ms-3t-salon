import Calendar from '../../components/Calendar'
import React, { useState, useContext } from "react"
import { Link } from 'gatsby'
import Layout from "../../components/Layout"
import TimeSlotPicker from "../../components/TimeSlotPicker"
import AppointmentSummary from '../../components/AppointmentSummary'
import firebase from "firebase"
import {BookingContext} from "../../context/BookingContext"
import { NavigationContext } from "../../context/NavigationContext";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CircularProgress } from '@material-ui/core'

const isBrowser = typeof window !== "undefined"

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
// Local state
const [loading, setLoading] = useState(false);

const getAvailabilityForDate = (day) => {
  setLoading(true)
const availability = firebase.functions().httpsCallable('getAvailabilityForDate');
if (isBrowser) {
  availability({date: day, serviceName: selectedService.id })
.then( result => {setSlots(result.data)
  setLoading(false)
})
}

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
      <Calendar action={getAvailabilityForDate}/>
      <CircularProgress style={{color: "black", marginTop: '3em',visibility: loading ? 'visible' : 'hidden'}}/>
      <TimeSlotPicker/>
      <AppointmentSummary/>
    </Layout>
  )
}
export default App
