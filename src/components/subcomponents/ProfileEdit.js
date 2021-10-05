import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import {
  Divider,
  Link,
  Tooltip,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
import { AuthContext } from '../../context/AuthContext'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    flexGrow: 1,
    maxWidth: 752,
  },
  listGroup: {
    backgroundColor: theme.palette.background.paper,
  },
  editButton: {
    color: '#5d5d5d',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  centered: {
    textAlign: 'center',
  },
  formSubmit: {
    marginTop: '1em',
  },
}))

export default function ProfileEdit() {
  // state
  const [dense, setDense] = useState(false)
  const [secondary, setSecondary] = useState(true)
  const [fieldToEdit, setFieldToEdit] = useState(null)
  const [dialogValue, setDialogValue] = useState({
    name: '',
    email: '',
    telephone: '',
  })
  const [response, setResponse] = useState({
    res: null,
    error: null,
  })
  // context
  const { user } = useContext(AuthContext)
  const { memberInfo } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)
  const { admin } = useContext(AuthContext)
  // styles
  const classes = useStyles()
  // test for error message to force sign out
  const authPromptMessage =
    'This operation is sensitive and requires recent authentication. Log in again before retrying this request.'
  // functions
  const handleUpdate = () => {
    if (fieldToEdit !== null && fieldToEdit === 'name') {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: dialogValue.name,
        })
        .then(() => {
          setResponse({
            ...response,
            res: 'User display name has been updated',
          })
          try {
            firebase
              .firestore()
              .collection('members')
              .doc(user.uid)
              .update({
                name: dialogValue.name,
              })
          } catch (err) {
            setResponse({ ...response, error: err.message })
          }
        })
        .catch(err => {
          setResponse({ ...response, error: err.message })
        })
    } else if (fieldToEdit !== null && fieldToEdit === 'email') {
      firebase
        .auth()
        .currentUser.updateEmail(dialogValue.email)
        .then(() => {
          setResponse({ ...response, res: 'Email updated successfully' })
          try {
            firebase
              .firestore()
              .collection('members')
              .doc(user.uid)
              .update({
                email: dialogValue.email,
              })
          } catch (err) {
            setResponse({ ...response, error: err.message })
          }
        })
        .catch(err => {
          setResponse({ ...response, error: err.message })
          if (err.message === authPromptMessage) {
            firebase.auth().signOut()
            setShowLogin(true)
          }
        })
    } else if (fieldToEdit !== null && fieldToEdit === 'tel') {
      if (
        /(?:(\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|\(?0)((?:\d{5}\)?[\.\s-]?\d{4,5})|(?:\d{4}\)?[\.\s-]?(?:\d{3}[\.\s-]?\d{3}))|(?:\d{4}\)?[\.\s-]?(?:\d{5}))|(?:\d{3}\)?[\.\s-]?\d{3}[\.\s-]?\d{3,4})|(?:\d{2}\)?[\.\s-]?\d{4}[\.\s-]?\d{4}))(?:[\s-]?((?:x|ext[\.\s]*|\#)\d{3,4})?)/.test(
          dialogValue.telephone
        )
      ) {
        firebase
          .firestore()
          .collection('members')
          .doc(user.uid)
          .update({
            telephone: dialogValue.telephone,
          })
          .then(() => {
            setResponse({ ...response, res: 'Updated telephone details' })
          })
          .catch(err => {
            setResponse({ ...response, error: err.message })
          })
      } else {
        setResponse({ ...response, error: 'Enter a valid phone number' })
      }
    } else if (fieldToEdit === null) {
      alert('please enter a value to update')
    }
    setFieldToEdit(null)
  }
  const removeHyphens = string => {
    const alteredString = string.replace(/-/g, ' ')
    return alteredString
  }

  return (
    <div>
      {!admin ? (
        <Grid container spacing={2}>
          <Grid item sm={12} container md={6}>
            <Grid item container justifyContent="center" xs={12}>
              {response.res ? <p>{response.res}</p> : null}
              {response.error ? (
                <p style={{ color: '#e5607c' }}>{response.error}</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <List dense={dense} className={classes.listGroup}>
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip title="enter your name">
                      <Avatar></Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  {fieldToEdit === 'name' ? (
                    <>
                      <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        name="name"
                        onChange={event =>
                          setDialogValue({
                            ...dialogValue,
                            name: event.target.value,
                          })
                        }
                      ></TextField>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={user.displayName}
                        secondary={secondary ? 'name' : null}
                      />
                    </>
                  )}
                  <ListItemSecondaryAction>
                    {fieldToEdit === 'name' ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit(null)
                          }}
                        >
                          cancel
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit('name')
                            handleUpdate()
                          }}
                        >
                          submit
                        </Button>
                      </>
                    ) : (
                      <IconButton edge="end" aria-label="delete">
                        <EditIcon
                          className={classes.editButton}
                          onClick={() => {
                            setResponse({ ...response, error: null, res: null })
                            setFieldToEdit('name')
                          }}
                        />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip title="your email address">
                      <Avatar>E</Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  {fieldToEdit === 'email' ? (
                    <TextField
                      margin="dense"
                      id="email"
                      label="email"
                      type="email"
                      name="email"
                      onChange={event =>
                        setDialogValue({
                          ...dialogValue,
                          email: event.target.value,
                        })
                      }
                    ></TextField>
                  ) : (
                    <ListItemText
                      primary={user.email}
                      secondary={secondary ? 'email' : null}
                    />
                  )}
                  <ListItemSecondaryAction>
                    {fieldToEdit === 'email' ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit(null)
                          }}
                        >
                          cancel
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit('email')
                            handleUpdate()
                          }}
                        >
                          submit
                        </Button>
                      </>
                    ) : (
                      <IconButton edge="end" aria-label="delete">
                        <EditIcon
                          className={classes.editButton}
                          onClick={() => {
                            setResponse({ ...response, error: null, res: null })
                            setFieldToEdit('email')
                          }}
                        />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip title="convenient contact number">
                      <Avatar>T</Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  {fieldToEdit === 'tel' ? (
                    <>
                      <TextField
                        margin="dense"
                        id="tel"
                        label="telephone"
                        type="tel"
                        name="telephone"
                        onChange={event =>
                          setDialogValue({
                            ...dialogValue,
                            telephone: event.target.value,
                          })
                        }
                      ></TextField>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={memberInfo.telephone}
                        secondary={secondary ? 'telephone' : null}
                      />
                    </>
                  )}

                  <ListItemSecondaryAction>
                    {fieldToEdit === 'tel' ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit(null)
                          }}
                        >
                          cancel
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          href="#"
                          onClick={() => {
                            setFieldToEdit('telephone')
                            handleUpdate()
                          }}
                        >
                          submit
                        </Button>
                      </>
                    ) : (
                      <IconButton edge="end" aria-label="delete">
                        <EditIcon
                          className={classes.editButton}
                          onClick={() => {
                            setResponse({ ...response, error: null, res: null })
                            setFieldToEdit('tel')
                          }}
                        />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" sm={12} md={6}>
            {memberInfo.userConsulted ? (
              <div className={classes.listGroup}>
                <List dense={dense}>
                  <ListItem>
                    <ListItemAvatar>
                      <Tooltip title="name of service allocated on consultation">
                        <Avatar>S</Avatar>
                      </Tooltip>
                    </ListItemAvatar>
                    <ListItemText
                      primary={removeHyphens(memberInfo.defaultService)}
                      secondary={secondary ? 'my service' : null}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar>
                      <Tooltip title="estimated time of treatment or service">
                        <Avatar>D</Avatar>
                      </Tooltip>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${memberInfo.durationService / 60} hrs`}
                      secondary={secondary ? 'duration' : null}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar>
                      <Tooltip title="cost for the service">
                        <Avatar>C</Avatar>
                      </Tooltip>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`£${memberInfo.costServicePence / 100}`}
                      secondary={secondary ? 'cost' : null}
                    />
                  </ListItem>
                </List>
              </div>
            ) : (
              <>
                <Typography variant="body1">
                  Need something specific ?{' '}
                </Typography>
                <Link href="tel:+07517140732"> Call for consultation</Link>
              </>
            )}
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </div>
  )
}
