import React, { useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import HistoryIcon from '@material-ui/icons/History'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

import { Link } from '@material-ui/core'

import { grey } from '@material-ui/core/colors'
import ProfileEdit from './ProfileEdit'
import { AuthContext } from '../../context/AuthContext'
import LoginPrompt from './LoginPrompt'
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
  rootSm: {
    backgroundColor: theme.palette.background.paper,
    width: '80vw',
    
  },
  rootMd: {
    backgroundColor: theme.palette.background.paper,
    
  },
  tabs: {
    margin: '0 auto',
  },
  swipeableView: {
    height: '45vh',
  },
}))

export default function FullWidthTabs() {
  const classes = useStyles()
  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = React.useState(0)

  const { user } = useContext(AuthContext)
  const { admin } = useContext(AuthContext)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }
  const logout = e => {
    navigate('/')
    e.preventDefault()
    const result = firebase
      .auth()
      .signOut()
      .then(() => {})
  }

  const CustomTabs = ({ isAdmin }) =>
    isAdmin ? (
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Admin" {...a11yProps(0)} icon={<SupervisorAccountIcon />} />
      </Tabs>
    ) : (
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
        <Tab label="Booking History" {...a11yProps(2)} icon={<HistoryIcon />} />
        <Tab label="Give Rating" {...a11yProps(3)} icon={<StarHalfIcon />} />
      </Tabs>
    )

  return (
    <ThemeProvider theme={buttonTheme}>
      <div className={matchesSm ? classes.rootSm : classes.rootMd}>
        <AppBar position="static" color="secondary">
          <CustomTabs isAdmin={admin}></CustomTabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.swipeableView}
        >
          <TabPanel className={classes.tabs} value={value} index={0} dir={theme.direction}>
            {user ? (
              admin ? (
                <ProfileAdmin />
              ) : (
                <ProfileEdit />
              )
            ) : (
              <LoginPrompt />
            )}
          </TabPanel>
          <TabPanel className={classes.tabs} value={value} index={1} dir={theme.direction}>
            {user ? <ProfileUpcomingBookings /> : <LoginPrompt />}
          </TabPanel>
          <TabPanel className={classes.tabs} value={value} index={2} dir={theme.direction}>
            {user ? <ProfileBookingsHistory /> : <LoginPrompt />}
          </TabPanel>
          <TabPanel className={classes.tabs} value={value} index={3} dir={theme.direction}>
            {user ? <ProfilePostRating /> : <LoginPrompt />}
          </TabPanel>
        </SwipeableViews>
        <Link
          style={{ display: user ? 'inherit' : 'none', padding: '1em' }}
          href="#"
          onClick={e => {
            logout(e)
          }}
        >
          Logout
        </Link>
      </div>
    </ThemeProvider>
  )
}
