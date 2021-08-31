import React from 'react';
import {graphql, useStaticQuery} from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Divider, useMediaQuery} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '4em'
  },
  paper: {
    display: 'grid',
    minHeight: 170,
    minWidth: 100,
    padding: ' 1em'
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: 'auto',
    backgroundColor: '#e4dcc5'
  },
  title: {
      marginBottom: '2em'
  }
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const data = useStaticQuery(graphql`
  query PriceListComponentQuery {
    allService {
      edges {
        node {
          name
          pricePence
          id
          variablePrice
          consultationOnly
        }
      }
    }
  }
  `)

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={0}>
            <Grid item  xs={matchesMd ? 4 : 8} className={classes.title}>
            <Typography variant="h3">Price List</Typography>
            <Divider/>
            </Grid>
            
        </Grid>
        <Grid container justifyContent="center" spacing={spacing}>
          {data.allService.edges.map((value) => (
            <Grid key={value.node.id} item xs={matchesSm ? 6 : matchesMd ? 3 : 2}>
              <Paper className={classes.paper} >
                  <Typography variant={'h6'}>{value.node.name}</Typography>
                  <Typography variant={'body1'}>
                      { value.node.variablePrice ? 
                      `from £${value.node.pricePence/100}` 
                      : 
                      !value.node.consultationOnly ?
                      `£${value.node.pricePence/100}`
                      :
                      null }
                  </Typography>
                  {value.node.consultationOnly ? 
                  <Button className={classes.button} variant="contained" color="blue">Consultation</Button>
                  :
                  <Button className={classes.button} variant="contained" color="blue">Book Now</Button>
                }
                  
                  
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
    </Grid>
  );
}
