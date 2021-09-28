import React, { useContext, useEffect } from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { AdminContext } from '../../context/AdminContext'
import _ from 'lodash'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import 'lodash'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'



export default function MemberDetails({ data }) {
  const graphQLData = useStaticQuery(graphql`
  query AdminServiceQuery {
    allService {
      edges {
        node {
          name
          id
        }
      }
    }
  }
  `)
  // arrays used to populate form fields
  const numPrice = []
  const numTime = []
    for (let i = 20; i <= 1000; i ++) {
      numPrice.push(i)
    }
    for (let i = 0; i <= 16; i++) {
      numTime.push(i)
    }
 
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
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
        console.log("doalogValue ", dialogValue[key])
        console.log("userObject ", userObject[0][key])
        memberData = {
          ...memberData,
          [key]: replaceIfAltered(dialogValue[key], userObject[0][key]),
        }
        console.log(memberData)
      })
      /* console.log('res')
      console.log(memberData) */
      resolve(memberData)
    })
    populateData
      .then(data => {
        if (/(?:(\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|\(?0)((?:\d{5}\)?[\.\s-]?\d{4,5})|(?:\d{4}\)?[\.\s-]?(?:\d{3}[\.\s-]?\d{3}))|(?:\d{4}\)?[\.\s-]?(?:\d{5}))|(?:\d{3}\)?[\.\s-]?\d{3}[\.\s-]?\d{3,4})|(?:\d{2}\)?[\.\s-]?\d{4}[\.\s-]?\d{4}))(?:[\s-]?((?:x|ext[\.\s]*|\#)\d{3,4})?)/.test(data.telephone))
        {
        console.log("matching regex")

        firebase
        .firestore()
        .collection('members')
        .doc(userObject[0].id)
        .update({
          telephone: data.telephone,
          costServicePence: parseInt(data.costServicePence * 100.0),
          defaultService: data.defaultService,
          userConsulted: true,
          durationService: parseInt(parseFloat(data.durationService) * 60.0),
        }).then((result) => {
          console.log("result", result)
        })
        onResult(false, 'Successfully updated client information', '')
        } else {
          onResult(true, 'Oops!... Something went wrong', 'check the phone number is valid')
          console.log(data)
        }
      })
      .catch(err => {
        console.log(err)
        onResult(true, 'Oops!... Something went wrong', 'please try again')
      })

    // if dialog values are not empty nor equal to useObject
  }

  const replaceIfAltered = (newValue, oldValue) => {
     console.log('testing old and new', oldValue, newValue)
    const checkNew = checkFields(newValue, oldValue)
    const checkOld = checkField(newValue, oldValue)
    console.log("check variables", checkOld, checkNew)
    return checkNew
      ? newValue
      : checkOld
      ? oldValue
      : console.log('no change to dataObject')
  }
  const checkFields = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
    //console.log('check new')
    //console.log(!equal /* && oldValue === undefined */ && newValue !== null && !!newValue)
    return (
      !equal /* && oldValue === undefined */ && newValue !== null && !!newValue
    )
  }
  const checkField = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
    /* console.log('check old')
    console.log(!!oldValue) */
    return (
      !equal &&
      oldValue !== null &&
      !!oldValue &&
      oldValue !== '' &&
      oldValue !== undefined
    )
  }

  const onResult = (isError, message, subMessage) => {
    setResult({ error: isError, message: message, subMessage: subMessage })
    setTimeout(function() {
      setResult('')
    }, 3000)
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
    email: null,
    telephone: null,
    defaultService: null,
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
    console.log("object cgange")
    console.log(userObject)
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
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" >
          {result ? result.message : ''}
        </Typography>
        <Typography variant="h6" >
          {result ? result.subMessage : ''}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">
          {typeof dialogValue.name === 'string'
            ? dialogValue.name
            : userObject
            ? userObject[0].name
            : ''}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">
          {typeof dialogValue.email === 'string'
            ? dialogValue.email
            : userObject
            ? userObject[0].email
            : ''}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
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
          style={{ color: 'black', width: matchesLg? '22%': matchesMd ? '44%': matchesSm? '60%': '' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <FormControl variant="standard" style={{width: matchesLg? '22%': matchesMd ? '44%': matchesSm? '60%': ''}}>
        <InputLabel id="simple-select-label">Choose Service</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          label="Selected Service"
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
        >
          {graphQLData.allService.edges.map((service) => (
             <MenuItem value={service.node.id}>{service.node.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
      <FormControl variant="standard" style={{width: matchesLg? '22%': matchesMd ? '44%': matchesSm? '60%': ''}}>
        <InputLabel id="duration-select">Add Duration (hours)</InputLabel>
        <Select
          labelId="duration-select"
          id="durationService"
          label="Duration"
          value={
              dialogValue.durationService
          }
          onChange={event =>
            setDialogValue({
              ...dialogValue,
              durationService: event.target.value,
            })
          }
        >
          {numTime.map((timeFrame) => (
             <MenuItem value={timeFrame/2}>{timeFrame/2}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={12} md={6} container>
        <Grid item container justifyContent="flex-end" spacing={0} xs={1}>
          
        </Grid>
        <Grid item xs={10}>
        <FormControl variant="standard" style={{width: matchesLg? '22%': matchesMd ? '44%': matchesSm? '60%': ''}}>
        <InputLabel id="price-select">Price (£)</InputLabel>
        <Select
          labelId="price-select"
          id="price"
          label="Price (£)"
          value={
            dialogValue.costServicePence
          }
          onChange={event =>
            setDialogValue({
              ...dialogValue,
              costServicePence: event.target.value,
            })
          }
        >
          {numPrice.map((timeFrame) => (
             <MenuItem value={timeFrame/2}>{timeFrame/2}</MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={1} lg={2}></Grid>
      <Grid item xs={10} lg={2}>
        <Button
          style={{marginLeft:'auto', marginBottom: '2em', marginTop: '1em', width:'80%'}}
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
