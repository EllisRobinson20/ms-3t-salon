import { graphql} from 'gatsby'
import React, {useContext} from 'react'
import Layout from '../../components/Layout'
import { BookingContext } from '../../context/BookingContext'
import { makeStyles} from '@material-ui/core/styles';
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

const customTheme = createTheme({ palette: { primary: red, secondary: grey } })


function DetailsCard() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
            <CardActions>
            <Button  color="textSecondary">Share</Button>
            <Button size="small">Learn More</Button>
            </CardActions>
       
      </Card>
    );
  }


export default function Services({data}) {
    // for this code to work (set selected service) will need the calendar in here and the booking context also
    //get all the treatments from firebase display in this page
    //double check cannot use express in fb hosting. is it possible in heroku to firestore for free?
    // may have to use functions if not
    

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
        }
      }));
  
  //setprops in here for which service is selected
    const {setSelectedService} = useContext(BookingContext);
    const {serviceListRef} = useContext(BookingContext);
    const services = data.allService.edges
    const classes = useStyles();
    return (
        <Layout>
            <Grid container>
                <Grid item xs={4}>
                    <ServicesList/>
                </Grid>
                <Grid item xs={8}>
                    {services.map(service => (
                        service.node.id === serviceListRef ?
                            <Card elevation={3} className={clsx(classes.container40, classes.detailsCard)}>
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
                                <Button size="small"
                                        color="primary"
                                        variant="contained" 
                                        onClick={() => {setSelectedService(service.node.name)} }>
                                    Book Now
                                </Button>
                                <Button size="small"
                                        variant="contained"
                                        color="secondary">
                                    Learn More
                                </Button>
                                </ThemeProvider>
                                </CardActions>
                                }
                            </Card>
                        
                        : 
                        ''
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}
export const query = graphql`
query ListServicesQuery {
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
