import React, { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../context/BookingContext'
import { AuthContext } from '../context/AuthContext'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import * as styles from '../styles/appointmentSummary.module.css'
import format from 'date-fns/format'
import firebase from 'gatsby-plugin-firebase'
import LoadingBackdrop from './subcomponents/LoadingBackdrop'
import AlertDialog from './subcomponents/AlertDialog'
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'


export default function AppointmentSummary() {
  // Data
  const data = useStaticQuery(graphql`
    query ListServicesQuery {
      allService {
        nodes {
          id
          durationMinutes
          name
        }
      }
    }
  `)
  const servicesRef = data.allService.nodes
  const durationSelectedService = () => {
    for (var i = 0; i < servicesRef.length; i++) {
      if (servicesRef[i].id === selectedService.id) {
        return servicesRef[i].durationMinutes
      }
    }
  }
  // Context
  const { user } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)

  const {showSignUpConfirmation, setShowSignUpConfirmation} = useContext(AuthContext)
  
  const { selectedService, setSelectedService } = useContext(BookingContext)
  const { selectedSlot, setSelectedSlot } = useContext(BookingContext)
  const { selectedDateGlobal, setNewDate } = useContext(BookingContext)
  const { isAvailability, setAvailability } = useContext(BookingContext)
  const { error, setError } = useContext(BookingContext)
  const { setSlots } = useContext(BookingContext)
  // State
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
  const [listName, setListName] = useState('')
  const [dropdownList, setDropdownList] = useState()
  const [loading, setLoading] = useState(false)
  const listItems = []
  // Functions
  const bookProvisionalIfAvail = () => {
    setLoading(true)
    /* console.log(user) */
    // ! Must Check Auth First
    if (user ) {
      const bookingAttempt = firebase
        .functions()
        .httpsCallable('bookProvisionalIfAvail')
      /* console.log('booking attempt fired') */
      bookingAttempt({
        name: user.displayName,
        email: user.email,
        service: selectedService.id,
        bookingDate: selectedDateGlobal,
        bookingTime: selectedSlot.id,
        durationService: durationSelectedService(),
      }).then(result => returnResult(result.data),
      setSlots([])
      )
    } else {
      setShowLogin(true);
      // need to keep the details of the booking if they login or sign up
    }
    
  }
  const returnResult = result => {
    setLoading(false)
    if (result) {
      console.log(result)
      console.log("result")
      setShowSignUpConfirmation(true)
      /* console.log(result) */
    } else {
      console.log(result)
      console.log("result")
      alert(
        'Sorry your booking time has already been taken ' +
          'please try another time slot'
      )
    }
  }

  const setListState = data => {
    setSelectedService({ id: data.id, name: data.name })
    setListName(data.name)
  }
  const closeAlertDialog = () => {
    setShowSignUpConfirmation(false)
  }
  useEffect(() => {
    setListName(selectedService.name)
    /* console.log("user")
    console.log(user) */
  }, [])

  useEffect(() => {
    setSlots([])
    setSelectedSlot('')
    /* console.log('selected service is' + selectedService.id) */
    data.allService.nodes.forEach(service => {
      if (service.id === selectedService.id) {
        listItems.push(
          <option selected value={service.id}>
            {service.name}
          </option>
        )
      } else {
        listItems.push(<option value={service.id}>{service.name}</option>)
      }
    })
    listItems.unshift(<option>...</option>)

    setDropdownList(
      <select
        onChange={e => {
          setListState(
            data.allService.nodes[e.target.options.selectedIndex - 1]
          )
        }}
      >
        {listItems}
      </select>
    )
  }, [selectedService.id])
  // Clear the error message when a service is selected
  useEffect(() => {
    if (selectedService.id) {
      setError('')
    } else {
      navigate("/salon/")
    }
  })

  // finish this maybe give an id or class name etc

  // check booking. if this time slot is still available allow booking. May want to  book the slot provisionally
  //enable button only if is avalability
  //state to tell client if no avail

  // enable only if there is a timeslot selected
  // enable only if there is a service selected
  useEffect(() => {
    setButtonIsEnabled(
      selectedSlot && selectedService.id && isAvailability ? true : false
    )
  }, [selectedSlot, selectedService.id, isAvailability])
  useEffect(() => {
    const d = new Date(selectedDateGlobal)
    const h = d.getHours()
    const m = d.getMinutes()
    const s = Math.floor(selectedSlot.id / 60)
    const sm = (selectedSlot.id / 60 - s) * 60
    /* console.log(h + ' : ' + s)
    console.log('sm ' + sm) */
    if (h !== s && m !== sm) {
      /* console.log('sm is not true') */
      setSelectedSlot('')
    }
  }, [selectedDateGlobal])
  return (
    <>
    <LoadingBackdrop loading={loading}/>
    <div className={styles.card}>
      {!selectedService.id ? (
        dropdownList
      ) : (
        <p className={styles.serviceLabel}>{listName}</p>
      )}
      <p className={styles.error}>
        {error === 'service' ? ' Select a treatment or service first ... ' : ''}
      </p>
      <li
        className={styles.changeSelection}
        onClick={() => {
          setSelectedService('')
          navigate("/salon")
        }}
      >
        {selectedService.id ? ' Change selection' : ''}
      </li>
      <h2>{selectedSlot.buttonLabel}</h2>
      <p>{format(selectedDateGlobal, 'EEEE do MMMM')}</p>
      <Link
        className={`${buttonIsEnabled ? styles.btn : styles.btnDisabled}`}
        to={'#'}
        onClick={(e) => {
          bookProvisionalIfAvail()
          e.preventDefault()
        }}
      >
        {buttonIsEnabled ? 'Book Now' : 'Select Date and Time to Book'}
      </Link>
    </div>
    <AlertDialog openDialog={showSignUpConfirmation} action={closeAlertDialog}>
      <DialogTitle>{"Booking successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your booking has been made with us. Please check your inbox for confimation.
          </DialogContentText>
        </DialogContent>
      </AlertDialog>
    </>
  )
}
