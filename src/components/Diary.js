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
  }))




export default function Diary() {

    const [value, setValue] = React.useState(0);

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
        name: <div><div><p >h1</p></div><br/><div><p>h1</p></div></div>,
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: moment("2018-02-23T13:30:00"),
        endTime: moment("2018-02-23T15:30:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }}
/>
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
            </Grid>
        </div>
    )
}
