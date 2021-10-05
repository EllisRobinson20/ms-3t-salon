import React, { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../context/BookingContext'
import { AuthContext } from '../context/AuthContext'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import * as styles from '../styles/appointmentSummary.module.css'
import format from 'date-fns/format'
import firebase from 'gatsby-plugin-firebase'
import LoadingBackdrop from './subcomponents/LoadingBackdrop'
import AlertDialog from './subcomponents/AlertDialog'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

export default function AppointmentSummary({ userDetails }) {
  // State
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
  const [listName, setListName] = useState('')
  const [dropdownList, setDropdownList] = useState()
  const [loading, setLoading] = useState(false)
  // Context
  const { user } = useContext(AuthContext)
  const { memberInfo } = useContext(AuthContext)
  const { admin } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)
  const { showSignUpConfirmation, setShowSignUpConfirmation } = useContext(
    AuthContext
  )
  const { selectedService, setSelectedService } = useContext(BookingContext)
  const { selectedSlot, setSelectedSlot } = useContext(BookingContext)
  const { selectedDateGlobal } = useContext(BookingContext)
  const { isAvailability } = useContext(BookingContext)
  const { error, setError } = useContext(BookingContext)
  const { setSlots } = useContext(BookingContext)
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
  // Firebase Functions
  const bookProvisionalIfAvail = () => {
    setLoading(true)
    if (user) {
      const bookingAttempt = firebase
        .functions()
        .httpsCallable('bookProvisionalIfAvail')
      bookingAttempt({
        name: admin ? userDetails[0].name : user.displayName,
        email: admin ? userDetails[0].email : user.email,
        service: selectedService.id,
        bookingDate: selectedDateGlobal,
        bookingTime: selectedSlot.id,
        durationService: durationSelectedService(),
        telephone: admin ? userDetails[0].telephone : memberInfo.telephone,
      }).then(result => returnResult(result.data), setSlots([]))
    } else {
      setShowLogin(true)
    }
  }
  // functions
  const returnResult = result => {
    setLoading(false)
    if (result) {
      setShowSignUpConfirmation(true)
    } else {
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
  // side effects
  useEffect(() => {
    setListName(selectedService.name)
  }, [])

  const listItems = []
  useEffect(() => {
    setSlots([])
    setSelectedSlot('')
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

  useEffect(() => {
    if (selectedService.id) {
      setError('')
    } else {
    }
  })

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
    if (h !== s && m !== sm) {
      setSelectedSlot('')
    }
  }, [selectedDateGlobal])
  return (
    <>
      <LoadingBackdrop loading={loading} />
      <div className={styles.card}>
        {admin ? (
          <p className={styles.serviceLabel}>{listName}</p>
        ) : !selectedService.id ? (
          // dropdownList state value removed
          <li
            className={styles.changeSelection}
            onClick={() => {
              setSelectedService('')
              navigate('/salon')
            }}
          >
            {!admin ? ' Select a service' : ''}
          </li>
        ) : (
          <p className={styles.serviceLabel}>{listName}</p>
        )}
        <p className={styles.error}>
          {error === 'service'
            ? ' Select a treatment or service first ... '
            : ''}
        </p>
        <li
          className={styles.changeSelection}
          onClick={() => {
            setSelectedService('')
            navigate('/salon')
          }}
        >
          {selectedService.id && !admin ? ' Change selection' : ''}
        </li>
        <h2>{selectedSlot.buttonLabel}</h2>
        <p>{format(selectedDateGlobal, 'EEEE do MMMM')}</p>
        <Link
          className={`${buttonIsEnabled ? styles.btn : styles.btnDisabled}`}
          to={'#'}
          onClick={e => {
            bookProvisionalIfAvail()
            e.preventDefault()
          }}
        >
          {buttonIsEnabled ? 'Book Now' : 'Select Date and Time to Book'}
        </Link>
      </div>
      <AlertDialog
        openDialog={showSignUpConfirmation}
        action={closeAlertDialog}
      >
        <DialogTitle>{'Booking successful'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your booking has been made with us. Please check your inbox for
            confimation.
          </DialogContentText>
        </DialogContent>
      </AlertDialog>
    </>
  )
}
