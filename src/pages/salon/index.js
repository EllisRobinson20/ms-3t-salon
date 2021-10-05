import { graphql, Link } from 'gatsby'
import React, { useContext, useState } from 'react'
import 'firebase/firestore'
import Layout from '../../components/Layout'
import { NavigationContext } from '../../context/NavigationContext'
import { AuthContext } from '../../context/AuthContext'
import { BookingContext } from '../../context/BookingContext'
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import ServicesList from '../../components/subcomponents/ServicesList'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { grey } from '@material-ui/core/colors'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const buttonTheme = createTheme({
  palette: { primary: { main: '#d52349' }, secondary: grey },
})

export default function Services({ location, data }) {
  // state
  setPageState(location.pathname)
  const [viewModel, setViewModel] = useState({
    duration: 0,
    price: 0,
    buttonLabel: '',
    message: '',
  })
  // context
  const { setPageState } = useContext(NavigationContext)
  const { lastPage } = useContext(NavigationContext)
  const { deviceIsMobile } = useContext(AuthContext)
  const { admin } = useContext(AuthContext)
  const { memberInfo } = useContext(AuthContext)
  const { setSelectedService } = useContext(BookingContext)
  const { serviceListRef } = useContext(BookingContext)
  // data
  const services = data.allService.edges
  const profilePicture = data.allCloudinaryMedia.edges[2].node.secure_url
  // styles
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: '2em',
    },
    container40: {
      width: '40vw',
    },
    container60: {
      width: '60vw',
    },
    container90: {
      width: '90vw',
    },
    detailsCard: {
      display: 'inline-block',
      padding: '2em',
      contentAlign: 'center',
      marginTop: '4em',
    },
    consultationLabel: {
      marginBottom: 'em',
    },
    c: {
      display: 'block',
      margin: '0 auto',
    },
    wrapper: {
      padding: '0 2em',
    },
    stickyButton: {
      width: '80vw',
      position: 'fixed',
      top: '87vh',
      left: '10%',
    },
    buttonHidden: {
      display: 'none',
    },
  }))
  const theme = useTheme()
  const classes = useStyles()
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
  // functions
  const updateView = serviceDetails => {
    console.log('updateView called')
    console.log(serviceDetails)
    if (
      memberInfo.userConsulted &&
      memberInfo.defaultService === serviceDetails.node.id
    ) {
      // using member info
      console.log('condition 1')
      setViewModel({
        ...viewModel,
        duration: `${memberInfo.durationService / 60} hrs`,
        price: `£${memberInfo.costServicePence / 100}`,
        buttonLabel: 'Book Now',
        message: '',
        consultation: false,
      })
    } else if (!memberInfo.userConsulted) {
      if (
        !serviceDetails.node.consultationOnly &&
        serviceDetails.node.variablePrice &&
        !serviceDetails.node.variableDuration
      ) {
        console.log('condition 2')
        setViewModel({
          ...viewModel,
          duration: `${serviceDetails.node.durationMinutes / 60} hrs`,
          price: `From £${serviceDetails.node.pricePence / 100}`,
          buttonLabel: 'Call Now',
          message: 'Call us to get a consultation',
          consultation: true,
        })
      } else if (
        !serviceDetails.node.consultationOnly &&
        !serviceDetails.node.variablePrice &&
        serviceDetails.node.variableDuration
      ) {
        console.log('condition 3')
        setViewModel({
          ...viewModel,
          duration: `From ${serviceDetails.node.durationMinutes / 60} hrs`,
          price: `£${serviceDetails.node.pricePence / 100}`,
          buttonLabel: 'Call Now',
          message: 'Call us to get a consultation',
          consultation: true,
        })
      } else if (
        !serviceDetails.node.consultationOnly &&
        !serviceDetails.node.variablePrice &&
        !serviceDetails.node.variableDuration
      ) {
        console.log('condition 4')
        setViewModel({
          ...viewModel,
          duration: `${serviceDetails.node.durationMinutes / 60} hrs`,
          price: `£${serviceDetails.node.pricePence / 100}`,
          buttonLabel: 'Book now',
          message: '',
          consultation: false,
        })
      } else if (
        serviceDetails.node.consultationOnly &&
        serviceDetails.node.variableDuration
      ) {
        console.log('condition 5')
        setViewModel({
          ...viewModel,
          duration: `From ${serviceDetails.node.durationMinutes / 60} hrs`,
          price: '',
          buttonLabel: 'Call Now',
          message: 'Call us to get a consultation',
          consultation: true,
        })
      } else if (
        serviceDetails.node.variablePrice &&
        serviceDetails.node.variableDuration
      ) {
        console.log('condition 6')
        setViewModel({
          ...viewModel,
          duration: `From ${serviceDetails.node.durationMinutes / 60} hrs`,
          price: `From £${serviceDetails.node.pricePence / 100}`,
          buttonLabel: 'Call Now',
          message: 'Call us to get a consultation',
          consultation: true,
        })
      }
    } else if (
      memberInfo.userConsulted &&
      serviceDetails.node.id !== memberInfo.defaultService
    ) {
      console.log('condition 7')
      setViewModel({
        ...viewModel,
        duration: `From ${serviceDetails.node.durationMinutes / 60} hrs`,
        price: `From £${serviceDetails.node.pricePence / 100}`,
        buttonLabel: 'Call Now',
        message: 'Call us to get a consultation',
        consultation: true,
      })
    }
  }
  const isBrowser = typeof window !== 'undefined'
  const [windowState, setWindowState] = useState(false)
  if (isBrowser) {
    window.onscroll = function(ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setWindowState(true)
      } else {
        setWindowState(false)
      }
    }
  }
  return (
    <Layout>
      <Grid
        container
        direction="row-reverse"
        className={classes.wrapper}
        justifyContent="center"
      >
        <Grid item xs={12} md={10} lg={6} xl={4}>
          {services.map(service =>
            service.node.id === serviceListRef ? (
              <>
                <Card on elevation={3} className={clsx(classes.detailsCard)}>
                  <CardContent>
                    <img
                      src={profilePicture}
                      alt="Stylists profile"
                      style={{ borderRadius: '20px' }}
                    ></img>
                    <Typography gutterBottom variant="h4" component="div">
                      {service.node.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Duration: {viewModel.duration}{' '}
                      {/* {service.node.durationMinutes / 60} hour */}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {service.node.consultationOnly ? (
                        <Typography gutterBottom variant="h6" component="div">
                          {viewModel.buttonLabel} {/* Consultation only */}
                        </Typography>
                      ) : (
                        `Price: ${viewModel.price}` /* `Price: £${service.node.pricePence / 100}` */
                      )}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="body"
                    color="text.secondary"
                    className={classes.consultationLabel}
                  >
                    {viewModel.message} {/* Call to book a consultation */}
                  </Typography>
                  <CardActions className={classes.c}>
                    <ThemeProvider theme={buttonTheme}>
                      {viewModel.consultation ? (
                        <a
                          href={deviceIsMobile ? 'tel:07517140732' : '#contact'}
                        >
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                          >
                            {viewModel.buttonLabel}
                            {/* Call for Consultation */}
                          </Button>
                        </a>
                      ) : (
                        <Link to="./booking">
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              setSelectedService({
                                id: service.node.id,
                                name: service.node.name,
                              })
                            }}
                          >
                            {viewModel.buttonLabel} {/* Book Now */}
                          </Button>
                        </Link>
                      )}
                    </ThemeProvider>
                  </CardActions>
                </Card>
                {windowState ? (
                  <ThemeProvider theme={buttonTheme}>
                    <Link to="./booking">
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className={clsx(
                          serviceListRef && matchesMd && !viewModel.consultation
                            ? classes.stickyButton
                            : classes.buttonHidden
                        )}
                        onClick={() => {
                          setSelectedService({
                            id: service.node.id,
                            name: service.node.name,
                          })
                        }}
                      >
                        {viewModel.buttonLabel} {/* Book Now */}
                      </Button>
                    </Link>
                    <a href="tel:07517140732">
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className={clsx(
                          serviceListRef &&
                            deviceIsMobile &&
                            viewModel.consultation
                            ? classes.stickyButton
                            : classes.buttonHidden
                        )}
                      >
                        {viewModel.buttonLabel}
                        {/* Call for Consultation */}
                      </Button>
                    </a>
                  </ThemeProvider>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )
          )}
        </Grid>
        <Grid item container xs={12} md={10} lg={6} xl={8}>
          <Link to={lastPage}>
            <IconButton
              href={lastPage}
              color="textSecondary"
              aria-label="upload picture"
              component="span"
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
          {!admin ? (
            <>
              <Typography variant="h4">Select A Service</Typography>
              <ServicesList action={updateView} />
            </>
          ) : (
            <Typography variant="h4">
              Bookings not allowed here for Admin!
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
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
          variableDuration
        }
      }
    }
    allCloudinaryMedia(
      sort: { fields: created_at, order: DESC }
      filter: { secure_url: { regex: "/salon-theme-header/" } }
    ) {
      edges {
        node {
          id
          secure_url
        }
      }
    }
  }
`
