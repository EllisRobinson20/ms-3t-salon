import Calendar from '../components/Calendar'
import React, { useState, useContext } from "react"
import { Link } from 'gatsby'
import TimeSlotPicker from "../components/TimeSlotPicker"
import AppointmentSummary from '../components/AppointmentSummary'
import firebase from 'gatsby-plugin-firebase'
import {BookingContext} from "../context/BookingContext"
import { NavigationContext } from "../context/NavigationContext";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CircularProgress } from '@material-ui/core'


export default function AdminBooking({ user }) {
  // state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  // context
  // get the availability of the chosen date returned from function
  const { isAvailability, setAvailability } = useContext(BookingContext)
  // need a reference to the chosen service in here
  const { selectedService } = useContext(BookingContext)
  // setting the global slots array
  const { setSlots } = useContext(BookingContext)
  // last page state for the back button
  const { lastPage } = useContext(NavigationContext)

  // functions
  const resetIfNoAvail = avail => {
    if (avail === false) {
      setSlots([])
    }
  }
  // firebase function call
  const getAvailabilityForDate = day => {
    if (isBrowser) {
      setLoading(true)
    const availability = firebase.functions().httpsCallable('getAvailabilityForDate');
      availability({date: day, serviceName: selectedService.id })
    .then( result => { const isAvail = result.data.length > 0
      result.data.error === "Business Closed" ? setError("Salon Closed") : isAvail ? setSlots(result.data) : setError("No Availability")
      setLoading(false)
      resetIfNoAvail(isAvail)
      setTimeout(() => {setError("")
    } , 2000)
    })
    }
    
    };
    return (
        <div>
            <Grid container>
        <Grid item xs={1}>
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
      <Typography variant="h4" style={{color: "#d52349", opacity: .6}}>{error? error : ""}</Typography>
      <TimeSlotPicker/>
      <AppointmentSummary userDetails={user}/>
        </div>
    )
}
