import React from 'react'
import { makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {
    Box,
    Typography,
    Button,
    Container,
    TextField,
  } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      flexGrow: 1,
      maxWidth: 752,
    },
    listGroup: {
      backgroundColor: theme.palette.background.paper,
    },
    editButton: {
      color: '#5d5d5d',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    centered: {
      textAlign: 'center',
    },
    formSubmit: {
      marginTop: '1em',
    },
  }))

export default function ProfilePostRating() {
    const classes = useStyles()
    const [rating, setRating] = React.useState(0)
    return (
        <div>
            <Box
              component="fieldset"
              mb={3}
              borderColor="transparent"
              className={classes.centered}
            >
              <Typography>
                "Good experience? We would really appreciate your feedback"
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  event.preventDefault()
                  setRating(newValue)
                }}
                size="large"
              />
            </Box>
            <Container className={classes.centered}>
              <TextField
                id="outlined-multiline-flexible"
                label="Comments"
                multiline
                maxRows={4}
                /*value={}*/
                /*onChange={}*/
                variant="outlined"
              />
            </Container>
            <Container className={classes.centered}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.formSubmit}
              >
                Send
              </Button>
            </Container>
        </div>
    )
}
