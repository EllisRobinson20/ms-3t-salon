import { Container, Grid } from '@material-ui/core'
import React, { useEffect, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { getDay, parseISO, add } from 'date-fns'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

import Timetable from 'react-timetable-events'
import moment from 'moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CallIcon from '@material-ui/icons/Call'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import DatePicker from './subcomponents/DatePicker'
import { Button, IconButton } from '@material-ui/core'

import { AdminContext } from '../context/AdminContext'
import { AuthContext } from '../context/AuthContext'

/**
 * Adds two numbers together.
 * @param {int} timeMinutes The first number.
 * @return {string} The sum of the two numbers.
 */
function getButtonLabel(timeMinutes) {
  let timeAsString = ''
  const timeInhours = timeMinutes / 60
  const hasMinutes = timeInhours - Math.floor(timeInhours) !== 0
  if (hasMinutes) {
    const remainder = timeInhours - Math.floor(timeInhours)
    const minutesPastHour = remainder * 60
    const hoursOnly = Math.floor(timeInhours)
    timeAsString =
      (timeInhours < 10 ? '0' + hoursOnly.toString() : hoursOnly.toString()) +
      ':' +
      (minutesPastHour < 10
        ? '0' + minutesPastHour.toString()
        : minutesPastHour.toString())
    return timeAsString
  } else {
    return (
      (timeInhours < 10
        ? '0' + timeInhours.toString()
        : timeInhours.toString()) + ':00'
    )
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '.8em',
  },
  container: {},
  table: {
    minWidth: 400,
  },
  timelineIcon: {
    transform: 'rotate(90deg)',
    maxWidth: '1em',
  },
  h: {
    color: '#720000',
  },
  g: {
    width: '100%',
    height: '100%',
  },
  t: {
    color: 'yellow!important',
    background: 'red!important',
  },
  d: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '25vw',
    padding: theme.spacing(2, 4, 3),
  },
  paperSm: {
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function Diary() {
  const callSalon = () => {
    window.open('tel:0')
  }
  const { deviceIsMobile } = useContext(AuthContext)
  const { datePicker } = useContext(AdminContext)
  const { dateStart } = useContext(AdminContext)
  const { dateEnd } = useContext(AdminContext)
  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    // Data is correct only in use effect with dateStart or no dependency
    // does not work with datePicker as dependency
  }, [dateStart])
  const ref = firebase.firestore().collection('bookingHistory')
  const bookings = []
  useEffect(() => {
    const bookingsRef = ref
      .where('dateOfBooking', '>', dateStart)
      .where('dateOfBooking', '<', dateEnd)
      .get()
    bookingsRef.then(results => {
      results.docs.forEach(doc => {
        //console.log(doc.data(), doc.id)
        bookings.push(doc.data(), doc.id)
      })
      sortBookings(results)
    })
  }, [datePicker])

  const classes = useStyles()
  //modal
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // Modal Details
  // id: 1,
  // name: renderDetails(1),
  // type: "booking",
  // startTime: moment("2018-02-23T11:30:00"),
  // endTime: moment("2018-02-23T13:30:00"),
  const [bookingDetails, setBookingDetails] = React.useState({
    name: 'data.name',
    service: 'data.selectedService',
    start: 'startTime',
    finish: 'finishTime',
  })
  const setSelectedBooking = data => {
    setBookingDetails({
      name: data.name,
      service: data.selectedService,
      start: getButtonLabel(data.startTimeMinutes),
      finish: getButtonLabel(data.startTimeMinutes + data.durationMinutes),
    })
    handleOpen()
  }
  const renderDetails = data => {
    return (
      <div>
        <Card
          elevation={0}
          style={{ width: '100%', height: '100%' }}
          onClick={() => {
            setSelectedBooking(data)
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={0}
              style={{ display: matchesSm ? 'none' : '' }}
            >
              <Grid style={{ paddingTop: '1em' }} item container xs={6}>
                <Grid item container xs={12} justifyContent="flex-start">
                  <Typography variant="body2" color="textSecondary">
                    Name: <strong>{data.name}</strong>
                  </Typography>
                </Grid>
              </Grid>
              <Grid style={{ paddingTop: '1em' }} item container xs={6}>
                <Grid item container xs={12} justifyContent="flex-start">
                  <Typography variant="body2" component="p">
                    Service: <strong>{data.selectedService}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
  // Modal
  const renderModal = () => {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={matchesSm ? classes.paperSm : classes.paper}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item container xs={0} justifyContent="center">
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      ></Typography>
                    </Grid>
                    <Grid item container xs={11} justifyContent="center">
                      <Typography
                        variant="h6"
                        className={classes.title}
                        color="textSecondary"
                      >
                        Booking
                      </Typography>
                    </Grid>
                    <Grid item container xs={1} justifyContent="flex-end">
                      {deviceIsMobile ? (
                        <p>
                          <a href='tel:0'>
                            <IconButton aria-label={'call'}>
                              <CallIcon />
                            </IconButton>
                          </a>{' '}
                        </p>
                      ) : (
                        ''
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2"></Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        Name: <strong>{bookingDetails.name}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        For: <strong>{bookingDetails.service}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} gutterBottom>
                      <Typography color="textSecondary">
                        <strong>0781234567</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" component="p">
                        Start: <strong>{bookingDetails.start}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" component="p">
                        Finish: <strong>{bookingDetails.finish}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2"></Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
  // Booking data
  const [bookingState, setBookingState] = React.useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })
  const bookingData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }

  const sortBookings = () => {
    bookings.forEach(booking => {
      switch (getDay(parseISO(booking.startISO))) {
        case 1:
          // monday
          bookingData.monday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        case 2:
          // tuesday
          bookingData.tuesday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        case 3:
          // wednesday
          bookingData.wednesday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        case 4:
          //thursday

          bookingData.thursday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        case 5:
          // friday
          bookingData.friday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        case 6:
          // saturday
          bookingData.saturday.push({
            id: booking.id,
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking.dateOfBooking.toDate()),
            endTime: moment(
              add(booking.dateOfBooking.toDate(), {
                minutes: booking.durationMinutes,
              })
            ),
          })
          break
        default:
        // NOT a business day
      }
    })
    setBookingState(bookingData)
  }

  return (
    <div className={classes.root}>
      {/* {sortBookings()} */}
      <Container className={classes.container}>
        <DatePicker />
      </Container>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Timetable events={bookingState} />
          {renderModal()}
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  )
}
