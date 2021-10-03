import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      color: '#fff',
    },
    
  }));

export default function LightText({children, b}) {
    const classes = useStyles();
    return (
        <Typography className={classes.root} variant={b}>
            {children}
        </Typography>
    )
}
