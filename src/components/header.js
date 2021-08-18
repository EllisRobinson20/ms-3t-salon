import PropTypes from 'prop-types'
import React, {useContext} from 'react'

import { Link } from 'gatsby'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import Storefront from '@material-ui/icons/Storefront';
import InfoIcon from '@material-ui/icons/Info';
import BookIcon from '@material-ui/icons/Book';


import Nav from '../components/Nav'

import { useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Paper } from '@material-ui/core'
import color from '@material-ui/core/colors/amber'
import { StylesContext } from '@material-ui/styles/StylesProvider'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Profile from '../components/Profile'
import { ProfileContext } from '../context/ProfileContext'
import { SvgIcon } from '@material-ui/core'
import { mdiContentCut } from '@mdi/js';

import DiarySlotMobile from './subcomponents/DiarySlotMobile'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  nav: {
    textAlign: 'center',
    color: 'black'
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    background: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    color: '#5d5d5d',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const Header = ({ siteTitle }) => {

  const {showProfile, setShowProfile} = useContext(ProfileContext);
  function handleProfileModal() {
    setShowProfile(!showProfile)
    
  }

  const classes = useStyles()

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }
  
  const breakWidth = useMediaQuery('(min-width:981px)')
 
  const SVGIcon = (props , path) => {
  return (
    <SvgIcon {...props}>
      <path d={path} />
    </SvgIcon>
  );
}
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={3}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, breakWidth && classes.hide || open && classes.hide)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Container className={classes.nav}>
          <Nav/>
          </Container>
          <IconButton
            color="inherit"
            aria-label="Show Profile"
            onClick={handleProfileModal}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
          <AccountCircleIcon  className={classes.menuIcon}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon className={classes.menuIcon} />
            ) : (
              <ChevronRightIcon className={classes.menuIcon} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to="/components">
            <ListItem button>
              <ListItemIcon>
              {SVGIcon(null, mdiContentCut)}  
              </ListItemIcon>
              <ListItemText>Salon</ListItemText>
            </ListItem>
          </Link>
          <Link to="/profile">
            <ListItem button>
              <ListItemIcon>
              <Storefront  className={classes.menuIcon}/>
              </ListItemIcon>
              <ListItemText>Shop</ListItemText>
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText>About</ListItemText>
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText>Blog</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    <Profile/>
    <DiarySlotMobile/>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
