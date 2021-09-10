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
                No booking history
              </Typography>
            </Container>
            <Container className={classes.centered}>
              
            </Container>
        </div>
    )
}
