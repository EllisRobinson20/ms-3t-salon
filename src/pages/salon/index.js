import { graphql, Link } from 'gatsby'
import React, {useContext} from 'react'
import Layout from '../../components/Layout'
import { BookingContext } from '../../context/BookingContext'
import * as styles from '../../styles/services.module.css'

import ServicesList from '../../components/subcomponents/ServicesList'

export default function Services({data}) {
    // for this code to work (set selected service) will need the calendar in here and the booking context also
    //get all the treatments from firebase display in this page
    //double check cannot use express in fb hosting. is it possible in heroku to firestore for free?
    // may have to use functions if not

  
  //setprops in here for which service is selected
  const {setSelectedService} = useContext(BookingContext);
  const services = data.allService.edges
    return (
        <Layout>
            <ServicesList/>
            <div className={styles.card}>
                {services.map(service => (
                    <div>
                        <div className={styles.services}>
                            <h3>{service.node.name}</h3>
                            <p>time {service.node.durationMinutes} minutes</p>
                            <p>price £{service.node.pricePence}</p>
                            <Link className={styles.btn} to={"./booking" } onClick={() => {setSelectedService(service.node.name)} }  key={service.id}>
                                Book 
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
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
        }
      }
    }
  }
`
