import React, {useContext}from 'react'
import { Link } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { AuthContext } from '../../context/AuthContext'
import { Typography } from '@material-ui/core';

import * as styles from '../../styles/header.module.css'


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
