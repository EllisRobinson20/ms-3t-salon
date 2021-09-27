import React, {useContext, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import { Card, Grid, Typography } from '@material-ui/core'
import NameSearch from '../components/subcomponents/NameSearch'
import MemberDetails from './subcomponents/MemberDetails'
import { AdminContext } from '../context/AdminContext'
import { useTheme} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'


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

  const {userObject} = useContext(AdminContext)

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

  const [dialogValue, setDialogValue] = React.useState({
    name: null,
    email: '',
    telephone: '',
    defaultService: '',
    durationService: 0,
  });


  useEffect(() => {
    setDialogValue({
      name: null,
      email: null,
      telephone: null,
      defaultService: null,
      durationService: null,
    })
  }, [userObject])


  return (
    <div>
      <Card className={matchesLg ? classes.containerLg : classes.containerSm} variant="outlined">
        <Grid container >
          <Grid item xs={3}>
          <NameSearch data={members}/>
          </Grid>
          <Grid item xs={12}>
          {userObject ? "" : <Typography variant="body1"> select name to begin</Typography>}
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>  
      </Card>
      {userObject ? <MemberDetails data={members}/> : ""}
      
    </div>
  )
}
