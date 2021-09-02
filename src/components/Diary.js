import { Container, Grid } from '@material-ui/core'
import React, {useEffect} from 'react'
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

import { getDay, parseISO } from 'date-fns'

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
        minWidth: 650,
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
        
        padding: theme.spacing(2, 4, 3),
      },
  }))




export default function Diary() {
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
                <Card onClick={() => {setSelectedBooking(data)}}>
                <CardContent >
                    
                    <Grid  container spacing={0} >
                        <Grid  style={{paddingTop:"auot 0"}} item container xs={6} >
                            <Grid item container xs={12} justifyContent="flex-start">
                            <Typography color="textSecondary" >
                            <strong>Name:</strong> {data.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                            <strong>Service: </strong>{data.selectedService}
                            </Typography>
                            </Grid>
                           
                        </Grid>
                        <Grid style={{paddingTop:"auto 0"}} item container xs={6} >
                            <Grid item container xs={12} justifyContent="flex-end">
                        <Typography variant="body2" color="textSecondary">
                            <strong>Start:</strong> {getButtonLabel(data.startTimeMinutes)}
                            </Typography>
                            <Typography variant="body2" component="p">
                            <strong>Finish: </strong>{getButtonLabel((data.startTimeMinutes+data.durationMinutes))}
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
                          <Grid item xs={12}>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>
                              <strong>{bookingDetails.name}</strong>
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="h5" component="h2">
                              {bookingDetails.service}
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="body2" component="p">
                              Start: {bookingDetails.start}
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="body2" component="p">
                              Finish: {bookingDetails.finish}
                              </Typography>
                          </Grid>
                      </Grid>    
                  </CardContent>
                  <CardActions>
                      <Grid container spacing={0}>
                          <Grid item xs={2} >
                          <CallIcon />
                          </Grid>
                          <Grid item xs={10}>
                              <Typography color="textSecondary">
                              0781234567 
                              </Typography>
                          </Grid>
                      </Grid>
                  </CardActions>
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
