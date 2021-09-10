import React, {useContext}from 'react'
import { Link } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { AuthContext } from '../../context/AuthContext'
import { Typography } from '@material-ui/core';

import * as styles from '../../styles/header.module.css'
import { NavigationContext } from "../../context/NavigationContext";

const useStyles = makeStyles(theme => ({
  root: {
    color: "red"
  },
  icon: {
      backgroundColor: "red"
  },
  title: {
      marginBottom: '1em'
  }
}))

export default function ProfileAdmin() {

  const {user} = useContext(AuthContext)
  const {profile} = useContext(AuthContext)
  

  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>
        <nav id={styles.nav}>
        <Typography className={classes.title} variant="h6" color="textSecondary">Welome {user.displayName}</Typography>
        <ul>
            <li >
                <Link to="/admin">Diary</Link>
            </li>
            <li >
                <Link to="/admin/consultation">Consultation</Link>
            </li>
        </ul>
        </nav>
    </div>
    
  )
}
