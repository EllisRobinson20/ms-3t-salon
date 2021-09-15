import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { AdminContext } from '../../context/AdminContext'
import _ from 'lodash'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import 'lodash'

const filter = createFilterOptions()

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
  container: {
    margin: '0 auto 2em',
    maxWidth: '65vw',
    display: 'block',
    padding: '12px 12px 12px 142px',
    overflow: 'hidden',
    borderRadius: '4px',
  },
}))

export default function MemberDetails({ data }) {
  const classes = useStyles()
  const [result, setResult] = React.useState(null)
  const { userObject } = useContext(AdminContext)
  const updateMemberDetails = () => {
    const populateData = new Promise((resolve, reject) => {
      let memberData = {
        telephone: null,
        costServicePence: null,
        defaultService: null,
        userConsulted: null,
        durationService: null,
      }
      Object.keys(memberData).forEach(key => {
        memberData = {
          ...memberData,
          [key]: replaceIfAltered(dialogValue[key], userObject[0][key]),
        }
      })
      console.log('res')
      console.log(memberData)
      resolve(memberData)
    })
    populateData
      .then(data => {
        console.log('data')
        console.log(data)
        console.log(userObject[0].id)
        firebase
          .firestore()
          .collection('members')
          .doc(userObject[0].id)
          .set({
            telephone: data.telephone,
            costServicePence: parseInt(data.costServicePence) * 100,
            defaultService: data.defaultService,
            userConsulted: true,
            durationService: parseInt(parseFloat(data.durationService) * 60),
          })
      })
      .catch(err => {
        console.log(err)
        
      })
      .then((err) => {
        if (err) {
          onResult("error", "Oops!... Something went wrong", "please try again")
        } else {
          console.log('successfully updated to database')
          onResult("success", "Successfully updated user", "")
        }
        
        handleClose()
      })

    // if dialog values are not empty nor equal to useObject
  }

  const replaceIfAltered = (newValue, oldValue) => {
    console.log('replace function')
    const checkNew = checkFields(newValue, oldValue)
    const checkOld = checkField(oldValue)
    return checkNew
      ? newValue
      : checkOld
      ? oldValue
      : console.log('no change to dataObject')
  }
  const checkFields = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
    console.log('check new')
    console.log(
      !equal /* && oldValue === undefined */ && newValue !== null && !!newValue
    )
    return (
      !equal /* && oldValue === undefined */ && newValue !== null && !!newValue
    )
  }
  const checkField = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
    console.log('check old')
    console.log(oldValue !== null && !!oldValue)
    return (
      !equal && oldValue !== null && !!oldValue && oldValue !== '' && oldValue !== undefined
    )
  }

  const onResult = (type, message, subMessage) => {
    setResult({type: type, message: message, subMessage: subMessage})
    setTimeout(function(){ setResult("") }, 3000);
  }

  const handleClose = () => {
    setDialogValue({ 
      name: '',
      email: '',
      telephone: '',
      defaultService: '',
      durationService: 0,
      costServicePence: 0,
    })
  }

  const [dialogValue, setDialogValue] = React.useState({
    name: null,
    email: '',
    telephone: '',
    defaultService: '',
    durationService: 0,
    costService: 0,
  })

  /* const handleSubmit = event => {
    event.preventDefault()
    setValue({
      name: dialogValue.name,
      email: dialogValue.email,
      telephone: dialogValue.telephone,
      durationService: dialogValue.durationService,
      defaultService: dialogValue.defaultService,
      costService: dialogValue.costService,
    })
    handleClose()
  } */
  useEffect(() => {
    setDialogValue({
      name: null,
      email: null,
      telephone: null,
      defaultService: null,
      durationService: null,
      costService: null,
    })
  }, [userObject])

  return (
    <Grid container>
      <Grid item xs={12}>
      <Typography variant="h4" color={result.type}>
          {result.message}
        </Typography>
      <Typography variant="h6" color={result.type}>
          {result.subMessage}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">
          {typeof dialogValue.name === 'string'
            ? dialogValue.name
            : userObject
            ? userObject[0].name
            : ''}
        </Typography>
        {/* <TextField
          inputRef={input => console.log(input)}
          margin="dense"
          id="name"
          value={
            typeof dialogValue.name === 'string'
              ? dialogValue.name
              : userObject
              ? userObject[0].name
              : ''
          }
          onChange={event =>
            setDialogValue({ ...dialogValue, name: event.target.value })
          }
          label="name"
          type="text"
          name="name"
        /> */}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">
          {typeof dialogValue.email === 'string'
            ? dialogValue.email
            : userObject
            ? userObject[0].email
            : ''}
        </Typography>
        {/* <TextField
          //inputRef={input => console.log(input)}
          margin="dense"
          id="email"
          value={
            typeof dialogValue.email === 'string'
              ? dialogValue.email
              : userObject
              ? userObject[0].email
              : ''
          }
          onChange={event =>
            setDialogValue({
              ...dialogValue,
              email: event.target.value,
            })
          }
          label="email"
          type="email"
          name="email"
        /> */}
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="dense"
          id="tel"
          value={
            typeof dialogValue.telephone === 'string'
              ? dialogValue.telephone
              : userObject
              ? userObject[0].telephone
              : ''
          }
          onChange={event =>
            setDialogValue({
              ...dialogValue,
              telephone: event.target.value,
            })
          }
          label="telephone"
          type="tel"
          name="telephone"
          style={{ color: 'black' }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="dense"
          id="serviceName"
          value={
            typeof dialogValue.defaultService === 'string'
              ? dialogValue.defaultService
              : userObject
              ? data
                  .map(edge =>
                    edge.email === userObject[0].email
                      ? edge.defaultService
                      : ''
                  )
                  .filter(value =>
                    value ? Object.keys(value).length !== 0 : null
                  )
              : ''
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
          value={
            typeof dialogValue.durationService === 'string'
              ? dialogValue.durationService
              : userObject
              ? data
                  .map(edge =>
                    edge.email === userObject[0].email
                      ? edge.durationService
                      : ''
                  )
                  .filter(value => typeof value !== 'string')
              : ''
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

      <Grid item xs={6} container>
        <Grid item container justifyContent="flex-end" spacing={0} xs={1}>
          <Typography style={{ marginTop: '1.3em' }} variant="body1">
            £
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            margin="dense"
            id="costServicePence"
            value={
              typeof dialogValue.costServicePence === 'string'
                ? dialogValue.costService
                : userObject
                ? data
                    .map(edge =>
                      edge.email === userObject[0].email
                        ? edge.costServicePence / 100
                        : ''
                    )
                    .filter(value => typeof value !== 'string')
                : ''
            }
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                costServicePence: event.target.value,
              })
            }
            label="Price"
            type="text"
            name="duration"
          />
        </Grid>
      </Grid>

      <Grid item xs={2}></Grid>
      <Grid item xs={2}>
        <Button
          style={{ marginTop: '1em', width: '80%' }}
          size="large"
          variant="contained"
          color="primary"
          onClick={updateMemberDetails}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  )
}
