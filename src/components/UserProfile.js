import { Avatar, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Call from '@material-ui/icons/Call'
import { AccessTime } from '@material-ui/icons'
import LightText from './subcomponents/Text/LightText'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'

export default function UserProfile({ details }) {
  // state
  const [userDetails, setUserDetails] = useState()
  // functions
  const removeHyphens = string => {
    const alteredString = string.replace(/-/g, ' ')
    return alteredString
  }
  const getFirstLetter = string => {
    return string.charAt(0)
  }
  // data
  const ref = firebase.firestore().collection('members')
  useEffect(() => {
    ref.onSnapshot(results => {
      results.docChanges().forEach(doc => {
        if (doc.type === 'modified') {
          setUserDetails({
            id: doc.doc.id,
            name: doc.doc.data().name,
            email: doc.doc.data().email,
            telephone: doc.doc.data().telephone,
            costServicePence: doc.doc.data().costServicePence,
            defaultService: doc.doc.data().defaultService,
            userConsulted: doc.doc.data().userConsulted,
            durationService: doc.doc.data().durationService,
          })
        }
      })
    })
  }, [])
  return (
    <Grid
      item
      container
      justifyContent="center"
      spacing={2}
      style={{ marginBottom: '3em' }}
    >
      {details !== undefined ? (
        <>
          <Grid item container direction="row" xs={2} justifyContent="center">
            <Avatar style={{ width: 72, height: 72 }}>
              {getFirstLetter(userDetails ? userDetails.name : details.name)}
            </Avatar>
          </Grid>
          <Grid item container direction="column" xs={12}>
            <Typography variant="h4">
              {userDetails ? userDetails.name : details.name}
            </Typography>
            <Typography style={{ marginBottom: '1em' }} variant="h6">
              {userDetails ? userDetails.email : details.email}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            spacing={2}
            style={{
              backgroundColor: '#d52349',
              marginBottom: '3em!important',
            }}
          >
            <Grid item xs={6} md={3} container justifyContent="center">
              <Grid item xs={12} md={4}>
                <Call style={{ color: '#fff', marginRight: '.5em' }} />
              </Grid>
              <Grid item xs={12} md={8}>
                <LightText b={'body1'}>
                  {userDetails ? userDetails.telephone : details.telephone}
                </LightText>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} container justifyContent="center">
              <Grid item xs={12} md={4}>
                <AccessTime style={{ color: '#fff', marginRight: '.5em' }} />
              </Grid>
              <Grid item xs={12} md={8}>
                <LightText variant="body1">
                  {userDetails
                    ? userDetails.durationService / 60
                    : details.durationService / 60}{' '}
                  hours
                </LightText>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} container justifyContent="center">
              <Grid item xs={12} md={4} container justifyContent="center">
                <Avatar
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: '#000',
                    marginRight: '0.2em',
                  }}
                >
                  S
                </Avatar>
              </Grid>
              <Grid item xs={12} md={8}>
                <LightText variant="body1">
                  {removeHyphens(
                    userDetails
                      ? userDetails.defaultService
                      : details.defaultService
                  )}
                </LightText>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} container justifyContent="center">
              <Grid item xs={12} md={4} container justifyContent="center">
                <Avatar
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: '#000',
                    marginRight: '0.2em',
                  }}
                >
                  C
                </Avatar>
              </Grid>
              <Grid item xs={12} md={8}>
                <LightText variant="body1">
                  £
                  {`${
                    userDetails
                      ? userDetails.costServicePence / 100
                      : details.costServicePence / 100
                  }`}
                </LightText>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
    </Grid>
  )
}
