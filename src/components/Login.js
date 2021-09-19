import React, { useState, useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { Link, navigate } from '@reach/router'
import * as styles from '../styles/login.module.css'
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Typography } from '@material-ui/core'

export default function Login() {
  const toggleView = e => {
    e.preventDefault()
    setShowSignUp(!showSignUp)
  }
  const closeLogin = e => {
    if (e) {
      e.preventDefault()
    } 
      setShowLogin(false)
      navigate('/')
    
  }
  const clearFields = () => {
    setData({ ...data, email: '', password: '', displayName: '', error: null })
  }

  const [data, setData] = useState({
    email: '',
    password: '',
    displayName: '',
    error: null,
  })

  const { setUser } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)

  const [showSignUp, setShowSignUp] = useState(false)

  const renderLogin = () => {
    const handleChange = e => {
      setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
      e.preventDefault()
      setData({ ...data, error: null })
      try {
        const result = await firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
        setUser(result)
        setShowLogin(false)
      } catch (err) {
        setData({ ...data, error: err.message })
      }
    }
    return (
      <div className={styles.background}>
        <Grid container>
        <Grid item xs={1}>
        <Link to={''} onClickCapture={closeLogin}>
        <CloseIcon/>
        </Link>
          </Grid>
        <Grid item xs={10}>
          <Typography variant="body2">Not yet a member?</Typography>
        <Link to={''} onClickCapture={toggleView}>
           Go to register ...
        </Link>
          </Grid>
          <Grid item xs={1}>
        
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="email">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          {data.error ? <p>{data.error}</p> : null}
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
  const renderSignUp = () => {
    const handleChange = e => {
      setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
      e.preventDefault()
      setData({ ...data, error: null })
      if (data.displayName && data.email && data.password) {
        try {
          const result = firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            
            result.then(cred => {
               firebase.firestore()
                .collection('members')
                .doc(cred.user.uid)
                .set({
                  email: data.email,
                  givenReview: false,
                  name: data.displayName,
                  userConsulted: false,
                })
                return cred
            })
            .catch(err => {
              console.log(err)
            })
            .then((cred) => {
              cred.user.updateProfile({
                displayName: data.displayName,
              })
              setUser(cred)
              clearFields()
              closeLogin()
              
            }).catch(err => {
              setData({ ...data, error: err.message})
            })
          
          
        } catch (err) {
          setData({ ...data, error: err.message })
        }
      } else {
        setData({ ...data, error: 'Please ensure you have filled all fields correctly' })
      }
    }

    return (
      <div id={"login"} className={styles.background}>
        <Grid container>
        <Grid item xs={1}>
        <Link to={''} onClickCapture={closeLogin}>
          <CloseIcon/>
        </Link>
          </Grid>
        <Grid item xs={10}>
          <Typography variant="body2">Already a member?</Typography>
          <Link to={''} onClickCapture={toggleView}>
           Go to login ...
        </Link>
          </Grid>
          <Grid item xs={1}>
        
          </Grid>
        </Grid>
        
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Name</label>
            <br />
            <input
              type="text"
              name="displayName"
              value={data.displayName}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="email">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          {data.error ? <p>{data.error}</p> : null}
          <input type="submit" style={{ color: 'red' }} value="Register" />
        </form>
      </div>
    )
  }

  return showSignUp ? renderSignUp() : renderLogin()
}
