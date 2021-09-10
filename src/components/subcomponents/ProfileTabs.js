import React, {useContext} from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import HistoryIcon from '@material-ui/icons/History'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
  Tooltip,
  Button,
  Container,
  TextField,
  Link,
} from '@material-ui/core'
import { StylesContext } from '@material-ui/styles/StylesProvider'


import { grey } from '@material-ui/core/colors'
import ProfileEdit from './ProfileEdit'
import {AuthContext} from '../../context/AuthContext'
import LoginPrompt from './LoginPrompt'
import { async } from '@firebase/util'
import ProfileAdmin from './ProfileAdmin'
import { navigate } from 'gatsby'
import ProfileBookingsHistory from './ProfileBookingsHistory'
import ProfileUpcomingBookings from './ProfileUpcomingBookings'
import ProfilePostRating from '../ProfilePostRating'

const buttonTheme = createTheme({
  palette: { primary: { main: '#d52349' }, secondary: grey },
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

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

export default function FullWidthTabs() {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const {user} = useContext(AuthContext)
  const {admin} = useContext(AuthContext)

  const [dense, setDense] = React.useState(false)
  const [secondary, setSecondary] = React.useState(false)

  

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }
  const logout = (e) => {
    navigate("/")
    e.preventDefault();
    const result = firebase.auth()
    .signOut().then(() => { 
    })
  }


  const CustomTabs = ({isAdmin}) => (
    isAdmin ?
    <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Admin"
              {...a11yProps(0)}
              icon={<SupervisorAccountIcon />}
            />
          </Tabs>
          :
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Edit Profile"
              {...a11yProps(0)}
              icon={<AccountCircleIcon />}
            />
            <Tab
              label="My Bookings"
              {...a11yProps(1)}
              icon={<CalendarTodayIcon />}
            />
            <Tab
              label="Booking History"
              {...a11yProps(2)}
              icon={<HistoryIcon />}
            />
            <Tab
              label="Give Rating"
              {...a11yProps(3)}
              icon={<StarHalfIcon />}
            />
          </Tabs>
  )
  

  return (
    <ThemeProvider theme={buttonTheme}>
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <CustomTabs isAdmin={admin}></CustomTabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            { user ? admin ? <ProfileAdmin/> : <ProfileEdit/> : <LoginPrompt/> }
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {user ? <ProfileUpcomingBookings/> : <LoginPrompt/>}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {user ? <ProfileBookingsHistory/> : <LoginPrompt/>}
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            {user ? <ProfilePostRating/> : <LoginPrompt/> }
          </TabPanel>
        </SwipeableViews>
        <Link style={{padding: '1em'}} href="#" onClick={(e) => {logout(e)}}>Logout</Link>
      </div>
    </ThemeProvider>
  )
}
