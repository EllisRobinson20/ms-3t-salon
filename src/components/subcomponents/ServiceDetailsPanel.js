import { Link } from 'gatsby'
import React ,{useContext}from 'react'
import * as styles from '../../styles/services.module.css'
import { BookingContext } from '../../context/BookingContext';



export default function ServiceDetailsPanel() {
    const {setSelectedService} = useContext(BookingContext);
    const {serviceDetailsRef} = useContext(BookingContext);
    return (
        
        serviceDetailsRef ? 
        <div className={styles.card}>
            <div className={styles.services}>
                <h3>{serviceDetailsRef.node.name}</h3>
                <p>time {serviceDetailsRef.node.durationMinutes} minutes</p>
                <p>price £{serviceDetailsRef.node.pricePence}</p>
                <Link className={styles.btn} to={"./booking" } onClick={() => {setSelectedService({id: serviceDetailsRef.node.id, name: serviceDetailsRef.node.name})} }  key={serviceDetailsRef.node.id}>
                    Book 
                </Link>
            </div>
        </div>
        :
        <h1>Select a hair treatment first</h1>
    )
}
