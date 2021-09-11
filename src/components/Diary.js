import { Container, Grid } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {graphql, useStaticQuery} from 'gatsby'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import DiarySlotMobile from './subcomponents/DiarySlotMobile'
import DiarySlot from './subcomponents/DiarySlot'


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Timeline from '../images/assets/timeline.svg';

import Timetable from 'react-timetable-events'
import moment from 'moment'


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CallIcon from '@material-ui/icons/Call';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { getDay, parseISO, getWeek, endOfWeek, startOfWeek } from 'date-fns'

import firebase from 'firebase/app'
import 'firebase/firestore'


/**
   * Adds two numbers together.
   * @param {int} timeMinutes The first number.
   * @return {string} The sum of the two numbers.
   */
 function getButtonLabel(timeMinutes) {
    let timeAsString = "";
    const timeInhours = timeMinutes / 60;
    const hasMinutes = (timeInhours - Math.floor(timeInhours)) !== 0;
    if (hasMinutes) {
      const remainder = timeInhours - Math.floor(timeInhours);
      const minutesPastHour = remainder * 60;
      const hoursOnly = Math.floor(timeInhours);
      timeAsString = (timeInhours < 10 ? "0"+hoursOnly.toString() :
      hoursOnly.toString()) +
      ":" +
      (minutesPastHour < 10 ? "0"+minutesPastHour.toString() :
      minutesPastHour.toString() );
      return timeAsString;
    } else {
      return (timeInhours < 10 ? "0"+timeInhours.toString() :
      timeInhours.toString()) + ":00";
    }
  }

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Monday', <DiarySlot/>,<DiarySlot/>,<DiarySlot/>),
    createData('Tuesday', <DiarySlot/>,<DiarySlot/>,<DiarySlot/>,<DiarySlot/>),
    createData('Wednesday', <DiarySlot/>,<DiarySlot/>,<DiarySlot/>,<DiarySlot/>),
    createData('Thursday', <DiarySlot/>,<DiarySlot/>,<DiarySlot/>,<DiarySlot/>),
    createData('Friday', <DiarySlot/>,<DiarySlot/>,<DiarySlot/>,<DiarySlot/>),
  ];

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: '.8em'
    },
    container: {
        
    },
    table: {
        minWidth: 400,
      },
      timelineIcon: {
        transform: 'rotate(90deg)',
        maxWidth: '1em'
      },
      h: {
          color: "#720000"
      }, 
      g: {
      width: '100%',
      height: '100%'},
      t: {
        color: 'yellow!important',
        background: 'red!important',
      },
      d: {
        width: '100%'
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
  }))




export default function Diary() {

  const [dataRT, setDataRT] = useState()
  const ref = firebase.firestore().collection("bookingHistory");
  useEffect(() => {

    const bookingsRef = ref.where('dateOfBooking', '<', new Date())
       
         const results = []
         bookingsRef.docs.forEach((doc) => {
           results.push(doc.data())
           console.log(results)
         })
         setDataRT(results)
       
  })






    const data = useStaticQuery(graphql`
    query AdminBookingComponentQuery {
        allBooking {
          edges {
            node {
              id
              finishISO
              startISO
              name
              selectedService
              startTimeMinutes
              durationMinutes
            }
          }
        }
      }
    `)
    useEffect(() => {
        sortBookings()
      })
    const [value, setValue] = React.useState(0);

    const [id, setId] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles()

    const theme = useTheme()

    const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

            // id: 1,
            // name: renderDetails(1),
            // type: "booking",
            // startTime: moment("2018-02-23T11:30:00"),
            // endTime: moment("2018-02-23T13:30:00"),
    const [bookingDetails, setBookingDetails] = React.useState ({
        name: 'data.name',
        service: 'data.selectedService',
        start: 'startTime',
        finish: 'finishTime'
    })
   
    const setSelectedBooking = (data) => {
        setBookingDetails({
        name: data.name,
        service: data.selectedService,
        start: getButtonLabel(data.startTimeMinutes),
        finish: getButtonLabel(data.startTimeMinutes + data.durationMinutes)
        })
        handleOpen()
    }
    
  
    const renderDetails = (data) => {
  
        return (
            <div>
                <Card elevation={0}style={{width: "100%", height: "100%"}} onClick={() => {setSelectedBooking(data)}}>
                <CardContent >
                    
                    <Grid container spacing={0}>
                        <Grid style={{paddingTop:"1em"}} item container xs={6} >
                            <Grid item container xs={12} justifyContent="flex-start">
                            <Typography variant="body2" color="textSecondary" >
                            Name: <strong>{data.name}</strong> 
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            Start: <strong>{getButtonLabel(data.startTimeMinutes)}</strong> 
                            </Typography>
                            </Grid>
                           
                        </Grid>
                        <Grid style={{paddingTop:"1em"}} item container xs={6} >
                            <Grid item container xs={12} justifyContent="flex-start">
                        
                            <Typography variant="body2" component="p">
                            Service: <strong>{data.selectedService}</strong>
                            </Typography>
                            <Typography variant="body2" component="p">
                            Finish: <strong>{getButtonLabel((data.startTimeMinutes+data.durationMinutes))}</strong>
                            </Typography>
                            </Grid>
                        </Grid>
                    </Grid>    
                </CardContent>
            </Card>
            </div>
        )
    }

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
            <div className={classes.paper}>
            <Card >
                  <CardContent >
                      <Grid container spacing={1}>
                          <Grid item container xs={0} justifyContent="center">
                              <Typography className={classes.title} color="textSecondary">
                              
                              </Typography>
                          </Grid>
                          <Grid item container xs={11} justifyContent="center">
                              <Typography variant="h6" className={classes.title} color="textSecondary">
                              Booking
                                  
                              </Typography>
                          </Grid>
                          <Grid item container xs={1} justifyContent="flex-end">
                          
                          <CallIcon />
                          
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="h5" component="h2">
                              
                              </Typography>
                          </Grid>
                          <Grid item xs={4}>
                              <Typography className={classes.title} color="textSecondary">
                              Name: <strong>{bookingDetails.name}</strong>
                              </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary">
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
                              <Typography variant="h5" component="h2">
                              
                              </Typography>
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

    const bookingData = 
    {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
  }
  const sortBookings = () => {
      data.allBooking.edges.forEach((booking) => {
        switch(getDay(parseISO(booking.node.startISO))) {
            case 1:
              // monday
              bookingData.monday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            case 2:
              // tuesday
              bookingData.tuesday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            case 3:
              // wednesday
              bookingData.wednesday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            case 4:
              //thursday
              bookingData.thursday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            case 5:
              // friday
              bookingData.friday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            case 6:
              // saturday
              bookingData.saturday.push(
                {
                    id: booking.node.id,
                    name: renderDetails(booking.node),
                    type: "booking",
                    startTime: moment(booking.node.startISO),
                    endTime: moment(booking.node.finishISO),
                }
              )
              break;
            default:
              // NOT a business day
          }
      })
  }

  
    return (
        <div className={classes.root}>
            {sortBookings()}
            <Container className={classes.container}>
            </Container>
            <Grid container spacing={0}>
                <Grid item xs={12}>  
                <Timetable 
                    events={bookingData}
                    />
                    {renderModal()}
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
            </Grid>
        </div>
    )
}
