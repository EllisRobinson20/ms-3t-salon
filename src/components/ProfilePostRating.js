import React, { useState, useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
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
  // state
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState()
  const [res, setRes] = useState(
    'Good experience? We would really appreciate your feedback'
  )
  // context
  const { user } = useContext(AuthContext)
  const { memberInfo } = useContext(AuthContext)
  // styles
  const classes = useStyles()
  // Firebase Functions
  const handlePostReview = () => {
    if (comment && rating > 0) {
      firebase
        .firestore()
        .collection('reviews')
        .add({
          name: user.displayName,
          comment: comment,
          rating: rating,
        })
        .then(documentReference => {
          console.log(`Added document with name: ${documentReference.id}`)
          setRes('Thanks for taking the time to give feedback!')
          firebase
            .firestore()
            .collection('members')
            .doc(user.uid)
            .update({
              givenReview: true,
            })
          setRating(0)
          setComment('')
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log('Please give a rating and comment to post')
    }
  }
  return (
    <div>
      {memberInfo.givenReview ? (
        <Typography>
          You have already given a review. We appreciate the feedback you have
          given us.
        </Typography>
      ) : (
        <>
          <Box
            component="fieldset"
            mb={3}
            borderColor="transparent"
            className={classes.centered}
          >
            <Typography>{res}</Typography>
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
              id="comment-input"
              name="comment"
              type="text"
              label="Comments"
              multiline
              maxRows={4}
              value={comment}
              variant="outlined"
              onChange={event => setComment(event.target.value)}
            />
          </Container>
          <Container className={classes.centered}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.formSubmit}
              onClick={() => {
                handlePostReview()
              }}
            >
              Send
            </Button>
          </Container>
        </>
      )}
    </div>
  )
}
