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
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell align="left">{renderTimelineSlot("9:00")}</TableCell>
                            <TableCell align="left">{renderTimelineSlot("10:00")}</TableCell>
                            <TableCell align="left">{renderTimelineSlot("11:00")}</TableCell>
                            <TableCell align="left">{renderTimelineSlot("12:00")}</TableCell>
                            <TableCell align="left">{renderTimelineSlot("13:00")}</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
            </Grid>
        </div>
    )
}
