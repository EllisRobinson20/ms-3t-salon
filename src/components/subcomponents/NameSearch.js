/* eslint-disable no-use-before-define */
import React, { useEffect, useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { AdminContext } from '../../context/AdminContext'
import { Grid, Typography } from '@material-ui/core'
import { useTheme} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { useState } from 'react'
import { LinearProgress } from '@material-ui/core'

  

const filter = createFilterOptions()

export default function FreeSoloCreateOptionDialog({ data }) {
  const membersData = []

  const [value, setValue] = React.useState(null)
  const [open, toggleOpen] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("users should change their passwords after account creation")
  const {setUserObject} = useContext(AdminContext)
  const {inConsultation, setInConsultation} = useContext(AdminContext)

  const theme = useTheme()
const matchesSm = useMediaQuery(theme.breakpoints.down('xs'))
const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))

const randomPassword = ()  => {
  let chars = "0123456789~!@#$%^&*()_+}{[]|abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pass = "";
  let passLength = 8;

  for (let i = 0; i < passLength; i++) {
      let randPass = Math.floor(Math.random() * chars.length);
      pass += chars.substring(randPass, randPass+1);
  }
  return pass
}

  const handleClose = () => {
    setDialogValue({
      name: '',
      email: '',
      telephone: '',
      password: '',
    })

    toggleOpen(false)
  }

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
  })
  const [res, setRes] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
  })

  const handleSubmit = event => {
    event.preventDefault()
  callAdminCreateUser()
    /* setValue({
      name: dialogValue.name,
      email: dialogValue.email,
      telephone: dialogValue.telephone,
      password: dialogValue.password,
    }) */
    

    handleClose()
  }
  // push data to the membersData array
  useEffect(() => {
    data.forEach(edge => {
      membersData.push({
        name: edge[0].name,
        email: edge[0].email,
        telephone: edge[0].telephone,
      })
    })
  })
  const callAdminCreateUser = () => {
    if ( dialogValue.name !== '' && dialogValue.email !== '' && dialogValue.telephone !== '') {
      if (
        /(?:(\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|\(?0)((?:\d{5}\)?[\.\s-]?\d{4,5})|(?:\d{4}\)?[\.\s-]?(?:\d{3}[\.\s-]?\d{3}))|(?:\d{4}\)?[\.\s-]?(?:\d{5}))|(?:\d{3}\)?[\.\s-]?\d{3}[\.\s-]?\d{3,4})|(?:\d{2}\)?[\.\s-]?\d{4}[\.\s-]?\d{4}))(?:[\s-]?((?:x|ext[\.\s]*|\#)\d{3,4})?)/.test(
          dialogValue.telephone) 
        ) {
          setLoading(true);
        const adminCreateUser = firebase.functions().httpsCallable('adminCreateUser');
      adminCreateUser({name: dialogValue.name, email: dialogValue.email, telephone: dialogValue.telephone, password: randomPassword()})
    .then( response => { 
      console.log(response)
      // msy need to wrap ifs in another if checking response.data !== null
      try {
        if ('errorInfo' in response.data) {
          setResult(response.data.errorInfo.message)
        } 
        else
        if ('response' in response.data ) {
          console.log(response.data.rejected.length)
          console.log(response.data.accepted.length)
          if(response.data.rejected.length === 0 && 
            response.data.accepted.length ===1) {
              setResult("successfully created user: "+ response.data.accepted[0])
            }
        }
        else
         {
          setResult("This email may already exist")
        }
        setLoading(false);
      } catch (err) {
        console.log(err)
      }
      
      
    })
      } else {
        setResult("Telephone is invalid")
      } 
    } else {
      setResult("please fill in all form fields")
    }
    
  }

  return (
    <React.Fragment >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue({
                name: newValue,
                email: '',
                telephone: '',
                password: '',
              })
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue({
              name: newValue.inputValue,
              email: '',
              telephone: '',
              password: '',
            })
          } else 
          if (newValue !== null){
            setValue(newValue)
            setUserObject(data.map((edge) => (
                edge[0].email === newValue.email ?  
                { id: edge[1],
                  name: edge[0].name,
                email: edge[0].email,
                telephone: edge[0].telephone,
                costServicePence: edge[0].costServicePence,
                defaultService: edge[0].defaultService,
                userConsulted: edge[0].userConsulted,
                durationService: edge[0].durationService,
                }
                :
                {}
  )).filter(value => Object.keys(value).length !== 0))
              
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            })
          }

          return filtered
        }}
        id="free-solo-dialog-demo"
        options={membersData}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option =>
          `${option.name} ${option.email ? `(${option.email})` : ''}  `
        }
        style={{ width: matchesLg || matchesMd ? 300 : 250}}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="Member name" variant="outlined" />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-name"
      >
          <DialogTitle id="form-dialog-name">Add a new user</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.name}
                  onChange={event =>
                    setDialogValue({ ...dialogValue, name: event.target.value })
                  }
                  label="name"
                  type="text"
                />
                {res.nameError ? res.nameError : ""}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="email"
                  value={dialogValue.email}
                  onChange={event =>
                    setDialogValue({
                      ...dialogValue,
                      email: event.target.value,
                    })
                  }
                  label="email"
                  type="email"
                  
                />
                {res.emailError ? res.emailError : ""}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="tel"
                  value={dialogValue.telephone}
                  onChange={event =>
                    setDialogValue({
                      ...dialogValue,
                      telephone: event.target.value,
                    })
                  }
                  label="telephone"
                  type="tel"
                  style={{color: "black"}}
                />
              </Grid>
              <Grid item xs={6}>
              
              </Grid>
              <Grid item xs={12}>
              <DialogContentText style={{padding: '0 auto'}}>
                {loading ? <LinearProgress/>
                  :
                <Typography style={{margin: '0 auto'}} variant="body2">
              {result}
              </Typography>
                  }
              
                
              
          </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              color="text-secondary"
            >
              Finish
            </Button>
            <Button variant="contained" onClick={callAdminCreateUser} color="primary">
              Add
            </Button>
          </DialogActions>
        
      </Dialog>
    </React.Fragment>
  )
}
