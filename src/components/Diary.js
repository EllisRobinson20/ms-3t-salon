import { Button, Container, Grid } from '@material-ui/core'
import React, { useEffect, useContext, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { getDay, parseISO, add, format } from 'date-fns'
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
import { IconButton } from '@material-ui/core'
import AlertDialog from './subcomponents/AlertDialog'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { AdminContext } from '../context/AdminContext'
import { AuthContext } from '../context/AuthContext'
import TextButton from './subcomponents/buttons/TextButton'

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
  // state ...
  // ... modal
  const [open, setOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [cancellationResult, setCancellationResult] = useState()
  // ... Booking data
  const [bookingState, setBookingState] = React.useState({
    MON: [],
    TUE: [],
    WED: [],
    THUR: [],
    FRI: [],
    SAT: [],
    SUN: [],
  })
  // context
  const { deviceIsMobile } = useContext(AuthContext)
  const { dateStart } = useContext(AdminContext)
  const { dateEnd } = useContext(AdminContext)
  // styles
  const classes = useStyles()
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
  const ref = firebase.firestore().collection('bookingHistory')
  const bookings = []
  // side effects ...
  // ... get data
  useEffect(() => {
    ref
      .where('dateOfBooking', '>', dateStart)
      .where('dateOfBooking', '<', add(dateEnd, { days: 1 }))
      .onSnapshot(results => {
        results.docChanges().forEach(doc => {
          if (doc.type === 'added') {
            bookings.push([doc.doc.data(), doc.doc.id])
          }
        })
        sortBookings()
      })
  }, [dateStart])

  // functions
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [bookingDetails, setBookingDetails] = useState({
    name: 'data.name',
    service: 'data.selectedService',
    start: 'startTime',
    finish: 'finishTime',
    email: 'email',
    telephone: 'tel',
  })
  const setSelectedBooking = data => {
    setBookingDetails({
      id: data[1],
      name: data[0].name,
      service: data[0].selectedService,
      start: getButtonLabel(data[0].startTimeMinutes),
      finish: getButtonLabel(
        data[0].startTimeMinutes + data[0].durationMinutes
      ),
      date: format(data[0].dateOfBooking.toDate(), 'do MMM y'),
      email: data[0].email,
      telephone: data[0].telephone,
    })
    handleOpen()
  }
  const removeHyphens = string => {
    const alteredString = string.replace(/-/g, ' ')
    return alteredString
  }
  const renderDetails = data => {
    return (
      <Typography
        onClick={() => {
          setSelectedBooking(data)
        }}
        style={{ fontSize: matchesSm ? '0.8em' : '' }}
        variant="body1"
        component="p"
      >
        <strong>{removeHyphens(data[0].selectedService)}</strong>
      </Typography>
    )
  }
  const closeDialog = () => {
    setShowConfirm(false)
  }
  const openDialog = () => {
    setShowConfirm(true)
  }
  const resetView = () => {
    setCancellationResult()
    sortBookings()
    setOpen(false)
    //window.location.reload()
  }
  // Firebase Function
  const handleCancelBooking = () => {
    firebase
      .firestore()
      .collection('bookingHistory')
      .doc(bookingDetails.id)
      .delete()
      .then(() => {
        setCancellationResult('Document successfully deleted!')
        setTimeout(() => {
          resetView()
        }, 2500)
        closeDialog()
      })
      .catch(error => {
        setCancellationResult('Error removing document: ', error)
        closeDialog()
      })
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
                  <Grid container spacing={2}>
                    <Grid item container xs={11} justifyContent="flex-start">
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      ></Typography>
                      {deviceIsMobile ? (
                        <p>
                          <a href={`tel:${bookingDetails.telephone}`}>
                            <IconButton aria-label={'call'}>
                              <CallIcon />
                            </IconButton>
                          </a>{' '}
                        </p>
                      ) : (
                        ''
                      )}
                    </Grid>
                    <Grid item container xs={1} justifyContent="flex-end">
                      <Button
                        onClick={() => {
                          setOpen(false)
                        }}
                        style={{ marginBottom: '2em' }}
                        size="small"
                      >
                        Close
                      </Button>
                    </Grid>
                    <Grid item container justifyContent="center" xs={12}>
                      <Typography variant="body2" component="h5">
                        {cancellationResult}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        Date: <strong>{bookingDetails.date}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        Name: <strong>{bookingDetails.name}</strong> (
                        {bookingDetails.email})
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        For:{' '}
                        <strong>{removeHyphens(bookingDetails.service)}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} gutterBottom>
                      <Typography color="textSecondary">
                        Tel: <strong>{bookingDetails.telephone}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" component="p">
                        Start: <strong>{bookingDetails.start}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" component="p">
                        Finish: <strong>{bookingDetails.finish}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-start">
                      <TextButton action={openDialog}>
                        Cancel Booking
                      </TextButton>
                      <AlertDialog
                        openDialog={showConfirm}
                        action={closeDialog}
                        confirm={handleCancelBooking}
                      >
                        <DialogTitle>{'Delete booking'}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            This action will permanently remove this booking,
                            are you sure?
                          </DialogContentText>
                        </DialogContent>
                      </AlertDialog>
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
  const sortBookings = () => {
    const bookingData = {
      MON: [],
      TUE: [],
      WED: [],
      THUR: [],
      FRI: [],
      SAT: [],
    }
    bookings.forEach(booking => {
      switch (getDay(parseISO(booking[0].startISO))) {
        case 1:
          // monday
          bookingData.MON.push({
            //id: booking[1],
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
              })
            ),
          })
          break
        case 2:
          // tuesday
          bookingData.TUE.push({
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
              })
            ),
          })
          break
        case 3:
          // wednesday
          bookingData.WED.push({
            //id: booking[1],
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
              })
            ),
          })
          break
        case 4:
          //thursday

          bookingData.THUR.push({
            //id: booking[1],
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
              })
            ),
          })
          break
        case 5:
          // friday
          bookingData.FRI.push({
            //id: booking[1],
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
              })
            ),
          })
          break
        case 6:
          // saturday
          bookingData.SAT.push({
            //id: booking[1],
            name: renderDetails(booking),
            type: 'booking',
            startTime: moment(booking[0].dateOfBooking.toDate()),
            endTime: moment(
              add(booking[0].dateOfBooking.toDate(), {
                minutes: booking[0].durationMinutes,
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
