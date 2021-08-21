import { Container, Grid } from '@material-ui/core'
import React from 'react'

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

    

    const [value, setValue] = React.useState(0);

    const [id, setId] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles()

    const theme = useTheme()

    const renderTimelineSlot = (time) => {
        return (
            <div>
                <Timeline className={classes.timelineIcon}/>
            <p>{time}</p>
            </div>
        )
    }
    const d = () => {
        alert("d")
    }



    const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



    const renderDetails = (id) => {
        
        return (
            <div>
                <Card onClick={handleOpen}>
                <CardContent >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Name: Trish
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                            {id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                            Start: 09:00
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                            Finish: 11:30
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
                              Name: Trish
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="h5" component="h2">
                              Weave
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="body2" component="p">
                              Start: 09:00
                              </Typography>
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="body2" component="p">
                              Finish: 11:30
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


    return (
        <div className={classes.root}>
            <Container className={classes.container}>
            </Container>
            <Grid container spacing={0}>
                <Grid item xs={12}>  
                <Timetable 
                    events={{
                        monday: [
                        {
                            id: 1,
                            name: renderDetails(1),
                            type: "booking",
                            startTime: moment("2018-02-23T11:30:00"),
                            endTime: moment("2018-02-23T13:30:00"),
                        },
                        {
                            id: 2,
                            name: renderDetails(2),
                            type: "booking",
                            startTime: moment("2018-02-23T13:30:00"),
                            endTime: moment("2018-02-23T14:30:00"),
                        },
                        {
                            id: 3,
                            name: renderDetails(3),
                            type: "booking",
                            startTime: moment("2018-02-23T15:30:00"),
                            endTime: moment("2018-02-23T16:30:00"),
                        },
                        ],
                        tuesday: [{
                            id: 2,
                            name: renderDetails(2),
                            type: "booking",
                            startTime: moment("2018-02-23T07:30:00"),
                            endTime: moment("2018-02-23T10:30:00"),
                        },
                        {
                            id: 3,
                            name: renderDetails(3),
                            type: "booking",
                            startTime: moment("2018-02-23T15:30:00"),
                            endTime: moment("2018-02-23T16:30:00"),
                        },],
                        wednesday: [{
                            id: 2,
                            name: renderDetails(2),
                            type: "booking",
                            startTime: moment("2018-02-23T13:30:00"),
                            endTime: moment("2018-02-23T14:30:00"),
                        },
                        {
                            id: 3,
                            name: renderDetails(3),
                            type: "booking",
                            startTime: moment("2018-02-23T15:30:00"),
                            endTime: moment("2018-02-23T16:30:00"),
                        },],
                        thursday: [],
                        friday: [],
                        saturday: [],
                    }}
                    />
                    {renderModal()}
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
            </Grid>
        </div>
    )
}
