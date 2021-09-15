import React, {useContext, useEffect, useState} from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'

import { Card, Grid, Typography } from '@material-ui/core'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import NameSearch from '../components/subcomponents/NameSearch'
import MemberDetails from './subcomponents/MemberDetails'
import { AdminContext } from '../context/AdminContext'


const filter = createFilterOptions();

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
  container: { margin: '0 auto 2em',maxWidth: '65vw', display: 'block', padding: "12px 12px 12px 142px", overflow: "hidden", borderRadius: "4px" }
}))

export default function Consultation() {
  const [members, setMembers] = useState([])
  useEffect(() => {
    const ref = firebase.firestore().collection('members').get();
    ref.then(results => {
      results.docs.forEach(doc => {
        setMembers(members => [...members, doc.data(), doc.id])
        console.log("members")
        console.log(members)
      })
    })
  }, [])

  const data = useStaticQuery(graphql`
    query AdminConsultationComponentQuery {
      allMembers {
        edges {
          node {
            name
            email
            telephone
            costServicePence
            defaultService
            userConsulted
            durationService
          }
        }
      }
    }
  `)

  const classes = useStyles()

  const [value, setValue] = React.useState(null);

  const {userObject} = useContext(AdminContext)

  const handleClose = () => {
    setDialogValue({
      name: '',
      email: '',
      telephone: '',
      defaultService: '',
      durationService: 0,
    });

    
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: null,
    email: '',
    telephone: '',
    defaultService: '',
    durationService: 0,
  });

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
  };
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
      <Card className={classes.container} variant="outlined">
        <Grid container>
          <Grid item xs={3}>
          <NameSearch data={data.allMembers.edges}/>
          </Grid>
          <Grid item xs={12}>
          {userObject ? "" : <Typography variant="body1"> select name to begin</Typography>}
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>  
      </Card>
      {userObject ? <MemberDetails/> : ""}
      
    </div>
  )
}
