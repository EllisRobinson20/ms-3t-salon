import React, {useContext}from 'react'
import {graphql , useStaticQuery} from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import { Divider, Link, Tooltip, Typography, Button, TextField } from '@material-ui/core'
import { AuthContext } from '../../context/AuthContext'
import MemberDetails from './MemberDetails'

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

  const {user} = useContext(AuthContext)
  const {profile} = useContext(AuthContext)
  

  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const [dense, setDense] = React.useState(false)
  const [secondary, setSecondary] = React.useState(true)
  const [fieldToEdit, setFieldToEdit] = React.useState(null)
  return (
    <div>
      <Grid container spacing={2}>
<Grid container justifyContent="center" sm={12}  md={6}>
      <div className={classes.listGroup}>
        <List dense={dense}>
          <ListItem>
            <ListItemAvatar>
              <Tooltip title="enter your name">
                <Avatar></Avatar>
              </Tooltip>
            </ListItemAvatar>
            {
              fieldToEdit === "name" ?
              <>
                <TextField
                  margin="dense"
                  id="name"
                  label="name"
                  type="text"
                  name="name"
                ></TextField>
              </>
              :
              <>
                <ListItemText primary={user.displayName} secondary={secondary ? 'name' : null} />
              </>
            }
            <ListItemSecondaryAction>
              
                {
                  fieldToEdit === "name" ?
                  <>
                  <Button variant="contained" size="small" href="#" onClick={(() => {setFieldToEdit(null)})}>cancel</Button>
                  <Button color="primary" variant="contained" size="small" href="#" onClick={(() => {setFieldToEdit(null)})}>submit</Button>
                  </>
                  :
                  <IconButton edge="end" aria-label="delete">
                  <EditIcon className={classes.editButton} onClick={(() => { setFieldToEdit("name")})} />
                  </IconButton>
                }
             
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Tooltip title="your email address">
                <Avatar>E</Avatar>
              </Tooltip>
            </ListItemAvatar>
            <ListItemText
              primary={user.email}
              secondary={secondary ? 'email' : null}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Tooltip title="convenient contact number">
                <Avatar>T</Avatar>
              </Tooltip>
            </ListItemAvatar>
            {
              fieldToEdit === "tel" ?
              <>
                <TextField
                  margin="dense"
                  id="tel"
                  label="telephone"
                  type="tel"
                  name="telephone"
                ></TextField>
              </>
              :
              <>
                <ListItemText
              primary={profile.telephone}
              secondary={secondary ? "telephone" : null}
            />
              </>
            }
            
            <ListItemSecondaryAction>
            
            {
                  fieldToEdit === "tel" ?
                  <>
                  <Button variant="contained" size="small" href="#" onClick={(() => {setFieldToEdit(null)})}>cancel</Button>
                  <Button color="primary" variant="contained" size="small" href="#" onClick={(() => {setFieldToEdit(null)})}>submit</Button>
                  </>
                  :
                  <IconButton edge="end" aria-label="delete">
                  <EditIcon className={classes.editButton} onClick={(() => { setFieldToEdit("tel")})} />
                  </IconButton>
                }
            
          </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item container justifyContent="center" sm={12} md={6}>
      {profile.userConsulted ? 
      <div className={classes.listGroup}>
      <List dense={dense}>
        <ListItem>
          <ListItemAvatar>
            <Tooltip title="name of service allocated on consultation">
              <Avatar>S</Avatar>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText primary={profile.defaultService} secondary={secondary ? "my service" : null} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Tooltip title="estimated time of treatment or service">
              <Avatar>D</Avatar>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText
            primary={profile.durationService}
            secondary={secondary ? "duration" : null}
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
            primary={profile.costServicePence}
            secondary={secondary ? "cost" : null}
          />
        </ListItem>
      </List>
    </div>
      : 
      <>
      <Typography variant="body1">Need something specific ? </Typography>
      <Link href="tel:+07517140732"> Call for consultation</Link>
      </>
      }
    </Grid>
    </Grid>
    </div>
    
  )
}
