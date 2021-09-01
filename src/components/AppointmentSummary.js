import React, {useContext, useEffect, useState } from 'react'
import { BookingContext } from '../context/BookingContext'
import { AuthContext } from '../context/AuthContext';
import { Link, graphql, useStaticQuery, navigate } from 'gatsby';
import * as styles from '../styles/appointmentSummary.module.css'
import format from "date-fns/format";
import firebase from "firebase"



export default function AppointmentSummary() {

    // Data
    const data = useStaticQuery(graphql`
    query ListServicesQuery {
        allService {
          nodes {
            id
            durationMinutes
          }
        }
      }
    `)
    const servicesRef = data.allService.nodes;
    const durationSelectedService = () => {
        for (var i = 0; i < servicesRef.length; i++) {
        if(servicesRef[i].id === selectedService) {
            return servicesRef[i].durationMinutes
        }
    }}
    // Context
    const {user} = useContext(AuthContext);
    const {setShowLogin} = useContext(AuthContext);
    
    const {selectedService, setSelectedService} = useContext(BookingContext);
    const {selectedSlot, setSelectedSlot} = useContext(BookingContext);
    const {selectedDateGlobal, setNewDate} = useContext(BookingContext);
    const {isAvailability, setAvailability} = useContext(BookingContext);
    const {error, setError} = useContext(BookingContext);
    const {setSlots} = useContext(BookingContext);
    // State
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false);
    const [dropdownList, setDropdownList] = useState();
    const listItems = [];
    // Functions
    const bookProvisionalIfAvail = () => {
        console.log(user)
        // ! Must Check Auth First
        if (user) {
            const bookingAttempt = firebase.functions().httpsCallable('bookProvisionalIfAvail');
            bookingAttempt({user: user, service: selectedService, 
                bookingDate: selectedDateGlobal, bookingTime: selectedSlot.id, durationService: durationSelectedService()})
            .then(result => console.log(returnResult(result.data)))  
        } else {
            // login
            //console.log("login please")
            // navigate("../../authentication/login")
            // need to keep the details of the booking if they login or sign up

            setShowLogin(true);
        }
        
    }
    const returnResult = (result) => {
        if (result) {
            alert("Your booking is successful")
            console.log(result)
        } else {
            alert("Sorry your booking time has already been taken "+
            "please try another time slot")
        }
    }
  
        useEffect(() => {
            setSlots([])
            setSelectedSlot("")
            console.log("date is " +selectedDateGlobal)
            data.allService.nodes.forEach(service => {
                if (service.id === selectedService) {
                listItems.push(
                    <option selected value={service.id}>{service.id}</option>
                )
                } else {
                    listItems.push(
                        <option value={service.id}>{service.id}</option>
                    )
                }
            })
                listItems.unshift(<option>...</option>)
            
            setDropdownList(
            <select onChange={(e) => {setSelectedService(data.allService.nodes[e.target.options.selectedIndex-1].id)}}>
                {listItems}
            </select>)
           
        }, [selectedService])
        // Clear the error message when a service is selected
        useEffect(() => {
            if (selectedService) {
                setError("")
            }
            
        })
        
            // finish this maybe give an id or class name etc

    

    

    // check booking. if this time slot is still available allow booking. May want to  book the slot provisionally
    //enable button only if is avalability
    //state to tell client if no avail
    
    // enable only if there is a timeslot selected
    // enable only if there is a service selected
    useEffect(() => {
        setButtonIsEnabled(selectedSlot && selectedService && isAvailability ? true : false)
    }, [selectedSlot, selectedService, isAvailability])
    useEffect(() => {
        const d = new Date(selectedDateGlobal)
        const h = d.getHours()
        const m = d.getMinutes()
        const s = Math.floor(selectedSlot.id/60)
        const sm = (selectedSlot.id/60 - s) * 60
        console.log(h + " : " + s)
        console.log("sm " + sm)
        if (h !== s && m !== sm) {
            console.log("sm is not true")
            setSelectedSlot("")
        }
    } , [selectedDateGlobal])
    
    return (
        <div className={styles.card}>
            {!selectedService ? dropdownList : <p className={styles.serviceLabel}>{selectedService}</p> }
            <p className={styles.error}>{error === "service" ? " Select a treatment or service first ... " : "" }</p>
            <li className={styles.changeSelection} onClick={() => {setSelectedService("")}} >{selectedService ? " Change selection" : "" }</li>
            <h2>{selectedSlot.buttonLabel}</h2>
            <p>{format(selectedDateGlobal, "EEEE do MMMM")}</p>
            <Link className={`${ buttonIsEnabled ? styles.btn : styles.btnDisabled }`}  to={"." } onClick={() => {bookProvisionalIfAvail()}} >
                                {buttonIsEnabled ? "Book Now" : "Select Date and Time to Book"}
                            </Link>
        </div>
    )
}
