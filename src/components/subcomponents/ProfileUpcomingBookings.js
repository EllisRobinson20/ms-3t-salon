import React, {useContext, useEffect} from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import { AuthContext } from '../../context/AuthContext'
import { BookingContext } from '../../context/BookingContext'
import { makeStyles } from '@material-ui/styles'
import { Typography, Container, Button } from '@material-ui/core'
import { set } from 'lodash'
import { navigate } from 'gatsby-link'

const useStyles = makeStyles(theme => ({
    centered: {
        textAlign: 'center',
      },
}))

export default function ProfileUpcomingBookings() {
  // context
  const {selectedService, setSelectedService} = useContext(BookingContext);
  const {memberInfo} = useContext(AuthContext);
  // data 
  const data = useStaticQuery(graphql`
  query ProfileUpcomingBookingsQuery {
    allService {
      edges {
        node {
          id
          name
        }
      }
    }
  }
  `)
  const services = data.allService.edges
  // styles
    const classes = useStyles()
  // functions
  const directUser = () => {
    if (memberInfo.userConsulted)
    {
      
        getServiceData()
        
      
      /* console.log("booking object", selectedService)
      console.log(selectedService) */
      navigate("/salon/booking/")
    } else 
    {
      navigate("/salon/")
    }
    
  }
  const getServiceData = () => {
    return services.forEach((service) => {
      //console.log({[field]: service.node[field]})
      if (service.node.id === memberInfo.defaultService)
      {
        console.log("if statement run")
         setSelectedService({
          id: service.node.id,
          name: service.node.name
        })
        
        
      }
    })
  }
    
    return (
        <div>
            <Container className={classes.centered}>
              <Typography variant="">
                You have no upcoming appointments
              </Typography>
            </Container>
            <Container className={classes.centered}>
              <Button  variant="contained" color="secondary" 
              onClick={() => {
                        directUser()
                      }}>
                Book an Appointment
              </Button>
            </Container>
        </div>
    )
}
