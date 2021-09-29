import React, {useContext, useEffect, useState} from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import { Button, Card, Grid, Typography } from '@material-ui/core'
import NameSearch from '../components/subcomponents/NameSearch'
import MemberDetails from './subcomponents/MemberDetails'
import { AdminContext } from '../context/AdminContext'
import { BookingContext } from '../context/BookingContext'
import { useTheme} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import TextButton from '../components/subcomponents/buttons/TextButton'
import AdminBooking from './AdminBooking'
import AlertDialog from './subcomponents/AlertDialog'
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'


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
  containerSm: { margin: '0 auto 2em', maxWidth: '65vw', display: 'block', padding: '0', border: 'none' },
  containerLg: { margin: '0 auto 2em',maxWidth: '65vw', display: 'block', padding: "12px 12px 12px 142px", overflow: "hidden", borderRadius: "4px" }
}))

export default function Consultation() {
  const {userObject} = useContext(AdminContext)
  const {setSelectedService} = useContext(BookingContext)
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
  
  const [members, setMembers] = useState([])
  useEffect(() => {
      const ref = firebase.firestore().collection('members')
      const observer = ref.onSnapshot(results => {
        setMembers([])
        results.docs.forEach(doc => {
          /* console.log("snapshot listener called")
          console.log(members) */
          setMembers(members => [...members, [doc.data(), doc.id]])
        })
      })
  }, [])

  const classes = useStyles()
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
 //const [value, setValue] = React.useState(null);

  

 /*  const handleClose = () => {
    setDialogValue({
      name: '',
      email: '',
      telephone: '',
      defaultService: '',
      durationService: 0,
    });
 
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      email: dialogValue.email,
      telephone: dialogValue.telephone,
      durationService: dialogValue.durationService,
      defaultService: dialogValue.defaultService,
    });

    handleClose();
  }; */

  const [dialogValue, setDialogValue] = useState({
    name: null,
    email: '',
    telephone: '',
    defaultService: '',
    durationService: 0,
  });
  const [showBooking, setShowBooking] = useState(false)

  const [userObjectLocal, setUserObjectLocal] = useState()
  useEffect(() => {
    setDialogValue({
      name: null,
      email: null,
      telephone: null,
      defaultService: null,
      durationService: null,
    })
    setUserObjectLocal(userObject)
  }, [userObject])

  const handleClick = () => {
    // may need to handle this checking userObject has properties and values
    if (userObject) {
      if (userObject[0].userConsulted) {
      data.allService.nodes.forEach(service => {
        if (userObject[0].defaultService === service.id) {
          console.log("match")
          setSelectedService({
            id: service.id, name: service.name
          })
        }
      })
      setShowBooking(!showBooking)
    }else {
      setShowAlert(true)
    }
    } 
    
  }
const [showAlert, setShowAlert] = useState(false)
  const closeAlertDialog = () => {
    setShowAlert(false)
  }
  return (
    <div>
      <Card className={matchesLg ? classes.containerLg : classes.containerSm} variant="outlined">
        <Grid container justifyContent="flex-start">
          <Grid onClick={() => {setShowBooking(false)}} style={{padding:"1em"}} item container justifyContent="flex-start" xs={4}>
          <NameSearch data={members} />
          {userObject ? "" : <Typography variant="body1"> Select name to begin</Typography>}
          </Grid>
          <Grid item xs={5}>

          </Grid>
          <Grid item xs={3}>
            
            <TextButton action={handleClick}>
            ADD BOOKING
            </TextButton>
          
          
          </Grid>
          <Grid item xs={12}>
          
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>  
      </Card>
      {showBooking ? <AdminBooking user={userObject}/> : ""}
      {userObject && !showBooking ? <MemberDetails data={members}/> : ""}
      <AlertDialog openDialog={showAlert} action={closeAlertDialog}>
      <DialogTitle>{"Customer not consulted"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Be sure to provide a consultation before attempting a booking!
          </DialogContentText>
        </DialogContent>
      </AlertDialog>
    </div>
  )
}
