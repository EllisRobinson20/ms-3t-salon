import React, {useContext, useEffect} from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { Box, Card, Grid, Typography } from '@material-ui/core'


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


import { AdminContext } from '../../context/AdminContext'
import { map } from 'lodash'

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

export default function MemberDetails() {
  const data = useStaticQuery(graphql`
    query MemberDetailsComponentQuery {
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
        <Grid container>
        <Grid item xs={6}>
          <TextField
            inputRef={input => console.log(input)}
            margin="dense"
            id="name"
            value={ typeof dialogValue.name === "string" ? dialogValue.name : userObject ? userObject[0].name : ""}
            onChange={event => 
              setDialogValue({ ...dialogValue, name: event.target.value })
            }
            label="name"
            type="text"
            name="name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
          inputRef={input => console.log(input)}
            margin="dense"
            id="email"
            value={typeof dialogValue.email === "string" ? dialogValue.email : userObject ? userObject[0].email : ""}
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                email: event.target.value,
              })
            }
            label="email"
            type="email"
            name="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            id="tel"
            value={typeof dialogValue.telephone === "string" ? dialogValue.telephone : userObject ? userObject[0].telephone : ""}
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                telephone: event.target.value,
              })
            }
            label="telephone"
            type="tel"
            name="telephone"
            style={{color: "black"}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            id="serviceName"
            value={typeof dialogValue.defaultService === "string" ? dialogValue.defaultService : userObject ? data.allMembers.edges.map((edge) => (
                edge.node.email === userObject[0].email ?
                edge.node.defaultService
                :
                ""
            )).filter(value => value ? Object.keys(value).length !== 0 : null )
          :
          ""
          }
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                defaultService: event.target.value,
              })
            }
            label="Selected Service"
            type="text"
            name="service"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            id="durationService"
            value={typeof dialogValue.durationService === "string" ? dialogValue.durationService : userObject ? data.allMembers.edges.map((edge) => (
                edge.node.email === userObject[0].email ?
                edge.node.durationService
                :
                ""
            )).filter(value => typeof value !== "string")
          :
          ""
          }
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                durationService: event.target.value,
              })
            }
            label="Duration"
            type="text"
            name="duration"
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
        <Button style={{marginTop: '1em',width: '80%'}} size="large" variant="contained" color="primary">Next</Button>
        </Grid>
      </Grid>
    )
  }