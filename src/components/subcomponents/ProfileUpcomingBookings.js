import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Container, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    centered: {
        textAlign: 'center',
      },
}))

export default function ProfileBookingsHistory() {
    const classes = useStyles()
    return (
        <div>
            <Container className={classes.centered}>
              <Typography variant="">
                You have no upcoming appointments
              </Typography>
            </Container>
            <Container className={classes.centered}>
              <Button href="/salon/booking/" variant="contained" color="secondary">
                Book an Appointment
              </Button>
            </Container>
        </div>
    )
}
