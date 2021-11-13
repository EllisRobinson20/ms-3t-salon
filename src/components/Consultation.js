import React, { useContext, useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import {
  Card,
  Collapse,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import NameSearch from '../components/subcomponents/NameSearch'
import MemberDetails from './subcomponents/MemberDetails'
import { AdminContext } from '../context/AdminContext'
import { BookingContext } from '../context/BookingContext'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import TextButton from '../components/subcomponents/buttons/TextButton'
import AdminBooking from './AdminBooking'
import AlertDialog from './subcomponents/AlertDialog'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import UserProfile from './UserProfile'

const useStyles = makeStyles(theme => ({
  form: {
    margin: '0 auto',
    maxWidth: '45vw',
  },
  formControl: {
    width: '100%',
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  containerSm: {
    margin: '0 auto 2em',
    maxWidth: '65vw',
    display: 'block',
    padding: '0',
    border: 'none',
  },
  containerLg: {
    margin: '0 auto 2em',
    maxWidth: '65vw',
    display: 'block',
    padding: '12px 12px 12px 142px',
    overflow: 'hidden',
    borderRadius: '4px',
  },
}))

export default function Consultation() {
  // state
  const [members, setMembers] = useState([])
  const [showBooking, setShowBooking] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  // context
  const { userObject } = useContext(AdminContext)
  const { setSelectedService } = useContext(BookingContext)
  // data
  const data = useStaticQuery(graphql`
    query ServicesNameQuery {
      allService {
        nodes {
          id
          name
        }
      }
    }
  `)
  const ref = firebase.firestore().collection('members')
  useEffect(() => {
   
      ref.onSnapshot(results => {
      setMembers([])
      results.docChanges().forEach(doc => {
        
        if (doc.type === "added") {
          console.log("snapshot added listener called")
          console.log(doc.doc.data())
        setMembers(members => [...members, [doc.doc.data(), doc.doc.id]])
        }
      })
    })
  }, [])
  // styles
  const classes = useStyles()
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  // functions
  const handleClick = () => {
    if (userObject) {
      if (userObject[0].userConsulted) {
        data.allService.nodes.forEach(service => {
          if (userObject[0].defaultService === service.id) {
            console.log('match')
            setSelectedService({
              id: service.id,
              name: service.name,
            })
          }
        })
        setShowBooking(!showBooking)
      } else {
        setShowAlert(true)
      }
    }
  }
  const closeAlertDialog = () => {
    setShowAlert(false)
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={4}
        container
        justifyContent="center"
        style={{ margin: '0 auto', padding: '3em' }}
      >
        <div>
          <Card
            className={matchesLg ? classes.containerLg : classes.containerSm}
            variant="outlined"
          >
            <Grid container justifyContent="flex-start">
              <Grid
                onClick={() => {
                  setShowBooking(false)
                }}
                style={{ padding: '1em' }}
                item
                container
                justifyContent="flex-start"
                xs={12}
              >
                <NameSearch data={members} />
                {userObject ? (
                  ''
                ) : (
                  <Typography variant="body1"> Select name to begin</Typography>
                )}
              </Grid>
            </Grid>
          </Card>
          {userObject && !showBooking ? <MemberDetails data={members} /> : ''}
          <AlertDialog openDialog={showAlert} action={closeAlertDialog}>
            <DialogTitle>{'Customer not consulted'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Be sure to provide a consultation before attempting a booking!
              </DialogContentText>
            </DialogContent>
          </AlertDialog>
        </div>
      </Grid>
      <Grid item xs={12} md={8} container>
        {userObject ? (
          <Paper
            elevation={5}
            style={{ margin: '0 auto', padding: '1em', maxWidth: matchesSm ? '96vw' : '60vw' }}
          >
            <Grid container justifyContent="flex-end">
              <TextButton action={handleClick}>ADD BOOKING</TextButton>
            </Grid>
            <UserProfile details={userObject[0]} />
            <Collapse in={showBooking}>
              {showBooking ? (
                <AdminBooking user={userObject} style={{ marginTop: '3em' }} />
              ) : (
                ''
              )}
            </Collapse>
          </Paper>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  )
}
