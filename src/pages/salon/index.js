import { graphql, Link} from 'gatsby'
import React, {useContext} from 'react'
import Layout from '../../components/Layout'
import { NavigationContext } from '../../context/NavigationContext'
import { BookingContext } from '../../context/BookingContext'
import { makeStyles, useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import ServicesList from '../../components/subcomponents/ServicesList'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import clsx from 'clsx'


import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'
import { IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const customTheme = createTheme({ palette: { primary: red, secondary: grey } })



export default function Services({location, data}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: '2em'
        },
        container40: {
            width: '40vw'
        },
        container60: {
            width: '60vw'
        },
        container90: {
            width: '90vw'
        },
        detailsCard: {
            display: 'inline-block',
            padding: '2em',
            contentAlign: 'center',
            marginTop: '4em'
        },
        consultationLabel: {
            marginBottom: 'em'
        },
        c: {
            display: 'block',
            margin: '0 auto'
        },
        wrapper: {
          padding: '0 2em'
        },
        stickyButton: {
          width: '80vw',
          position: 'fixed',
          top: '90vh',
          left: '10%', 
        },
        buttonHidden: {
          display: 'none'
        }
      }));
  
  //setprops in here for which service is selected
    const {setSelectedService} = useContext(BookingContext);
    const {serviceListRef} = useContext(BookingContext);
    const services = data.allService.edges
    const theme = useTheme();
    const classes = useStyles();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Layout>
            <Grid container direction="row-reverse" className={classes.wrapper} justifyContent="center">
                
                <Grid item xs={12} md={10} lg={6} xl={4}>
                    {services.map(service => (
                        service.node.id === serviceListRef ?
                            <Card elevation={3} className={clsx(classes.detailsCard)}>
                                <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                {service.node.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {service.node.description}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                Duration: {service.node.durationMinutes/60} hour
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                {service.node.consultationOnly ? 
                                <Typography gutterBottom variant="h6" component="div">
                                Consultation only
                                </Typography>
                                :
                                `Price: £${service.node.pricePence/100}`
                                }
                                </Typography>
                                </CardContent>
                                {service.node.consultationOnly ?
                                <Typography variant="body" color="text.secondary" className={classes.consultationLabel}>
                                Call to book a consultation
                                </Typography>
                                :
                                <CardActions className={classes.c}>
                                    <ThemeProvider theme={customTheme}>
                                <Link to="./booking">
                                <Button size="large"
                                        color="primary"
                                        variant="contained" 
                                        onClick={() => {setSelectedService(service.node.name)} }>
                                    Book Now
                                </Button>
                                </Link>
                                </ThemeProvider>
                                </CardActions>
                                }
                            </Card>
                        
                        : 
                        ''
                    ))}
                </Grid>
                <Grid item container xs={12} md={10} lg={6} xl={8}>
                  <Link to="/">
                    <IconButton href="/" color="textSecondary" aria-label="upload picture" component="span">
                    <ArrowBackIcon/>
                  </IconButton>
                  </Link>
                  <Typography variant="h4">
                    Select A Service
                  </Typography>
                    <ServicesList/>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
            <ThemeProvider theme={customTheme}>
              <Link to="./booking">
            <Button size="large"
                    color="primary"
                    variant="contained" 
                    className={clsx(serviceListRef && matchesMd ? classes.stickyButton: classes.buttonHidden) }
                    onClick={() => {setSelectedService(serviceListRef)} }
                    >
                Book Now
            </Button>
            </Link>
            </ThemeProvider>
        </Layout>
    )
}
export const query = graphql`
query ListServicesPageQuery {
    allService {
      edges {
        node {
          id
          durationMinutes
          pricePence
          bookingCount
          description
          name
          upperPriceLimit
          variablePrice
          consultationOnly
        }
      }
    }
  }
`
