import React, { useState, useContext, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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
  // state
  const [result, setResult] = useState(null)
  // context
  const { userObject } = useContext(AdminContext)
  // data
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
  for (let i = 20; i <= 1000; i++) {
    numPrice.push(i)
  }
  for (let i = 0; i <= 16; i++) {
    numTime.push(i)
  }
  // styles
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  // functions
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
          [key]: replaceIfAltered(dialogValue[key], userObject[0][key], key),
        }
      })
      resolve(memberData)
    })
    populateData
      .then(data => {
        if (
          /(?:(\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|\(?0)((?:\d{5}\)?[\.\s-]?\d{4,5})|(?:\d{4}\)?[\.\s-]?(?:\d{3}[\.\s-]?\d{3}))|(?:\d{4}\)?[\.\s-]?(?:\d{5}))|(?:\d{3}\)?[\.\s-]?\d{3}[\.\s-]?\d{3,4})|(?:\d{2}\)?[\.\s-]?\d{4}[\.\s-]?\d{4}))(?:[\s-]?((?:x|ext[\.\s]*|\#)\d{3,4})?)/.test(
            data.telephone
          )
        ) {
          firebase
            .firestore()
            .collection('members')
            .doc(userObject[0].id)
            .update({
              telephone: data.telephone,
              costServicePence: parseInt(data.costServicePence /* * 100.0 */),
              defaultService: data.defaultService,
              userConsulted: true,
              durationService: parseInt(
                parseFloat(data.durationService) /* * 60.0 */
              ),
            })
            .then(result => {})
          onResult(false, 'Successfully updated client information', '')
        } else {
          onResult(
            true,
            'Oops!... Something went wrong',
            'check the phone number is valid'
          )
        }
      })
      .catch(err => {
        onResult(true, 'Oops!... Something went wrong', 'please try again')
      })
  }

  const replaceIfAltered = (newValue, oldValue) => {
    const checkNew = checkFields(newValue, oldValue)
    const checkOld = checkField(newValue, oldValue)
    return checkNew ? newValue : oldValue
  }
  const checkFields = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
    return !equal && newValue !== null && !!newValue
  }
  const checkField = (newValue, oldValue) => {
    const equal = _.isEqual(oldValue, newValue)
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
      //window.location.reload()
    }, 3000)
  }

  const [dialogValue, setDialogValue] = React.useState({
    name: null,
    email: null,
    telephone: null,
    defaultService: null,
    durationService: 0,
    costService: 0,
  })
  // side effects
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
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">{result ? result.message : ''}</Typography>
        <Typography variant="h6">{result ? result.subMessage : ''}</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          margin="dense"
          id="tel"
          value={
            typeof dialogValue.telephone === 'string'
              ? dialogValue.telephone
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
          style={{
            color: 'black',
            width: matchesLg
              ? '60%'
              : matchesMd
              ? '44%'
              : matchesSm
              ? '60%'
              : '',
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl
          variant="standard"
          style={{
            width: matchesLg
              ? '60%'
              : matchesMd
              ? '44%'
              : matchesSm
              ? '60%'
              : '',
          }}
        >
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
            {graphQLData.allService.edges.map(service => (
              <MenuItem value={service.node.id}>{service.node.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl
          variant="standard"
          style={{
            width: matchesLg
              ? '60%'
              : matchesMd
              ? '44%'
              : matchesSm
              ? '60%'
              : '',
          }}
        >
          <InputLabel id="duration-select">Add Duration (hours)</InputLabel>
          <Select
            labelId="duration-select"
            id="durationService"
            label="Duration"
            value={dialogValue.durationService}
            onChange={event =>
              setDialogValue({
                ...dialogValue,
                durationService:
                  typeof event.target.value === 'number'
                    ? event.target.value * 60
                    : event.target.value,
              })
            }
          >
            {numTime.map(timeFrame => (
              <MenuItem value={timeFrame / 2}>{timeFrame / 2}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12} container>
        <Grid
          item
          container
          justifyContent="flex-end"
          spacing={0}
          xs={1}
        ></Grid>
        <Grid item xs={10}>
          <FormControl
            variant="standard"
            style={{
              width: matchesLg
                ? '71%'
                : matchesMd
                ? '44%'
                : matchesSm
                ? '60%'
                : '',
            }}
          >
            <InputLabel id="price-select">Price (£)</InputLabel>
            <Select
              labelId="price-select"
              id="price"
              label="Price (£)"
              value={dialogValue.costServicePence}
              onChange={event =>
                setDialogValue({
                  ...dialogValue,
                  costServicePence:
                    typeof event.target.value === 'number'
                      ? event.target.value * 100
                      : event.target.value,
                })
              }
            >
              {numPrice.map(timeFrame => (
                <MenuItem value={timeFrame / 2}>{timeFrame / 2}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={1}></Grid>
      <Grid item xs={10}>
        <Button
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '2em',
            marginTop: '1em',
            width: '80%',
          }}
          size="large"
          variant="contained"
          color="primary"
          onClick={updateMemberDetails}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  )
}
