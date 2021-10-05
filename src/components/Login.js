import React, { useState, useContext } from 'react'
import firebase from 'gatsby-plugin-firebase'
import 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { Link } from '@reach/router'
import * as styles from '../styles/login.module.css'
import CloseIcon from '@material-ui/icons/Close'
import { Grid, Paper, Typography, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export default function Login() {
  // state
  const [showSignUp, setShowSignUp] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
    displayName: '',
    error: null,
    nameError: null,
    emailError: null,
    passwordError: null,
  })
  // context
  const { setUser } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)
  const { setLoginAttempt } = useContext(AuthContext)
  const { setShowSignUpConfirmation } = useContext(AuthContext)
  // styles
  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  // functions
  const toggleReset = e => {
    e.preventDefault()
    setShowReset(!showReset)
  }
  const toggleView = e => {
    e.preventDefault()
    setShowSignUp(!showSignUp)
  }
  const closeLogin = e => {
    if (e) {
      e.preventDefault()
    }
    setShowReset(false)
    setShowSignUp(false)
    setShowLogin(false)
  }
  const clearFields = () => {
    setData({ ...data, email: '', password: '', displayName: '', error: null })
  }
  // components
  const renderResetPassword = () => {
    const handleChange = e => {
      setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
      e.preventDefault()
      setData({ ...data, error: null })
      try {
        const result = await firebase
          .auth()
          .sendPasswordResetEmail(data.email)
          .then(res => {
            if (res) {
              //setUser(result)
              //setShowLogin(false)
            }
          })
      } catch (err) {
        setData({ ...data, emailError: err.message })
      }
    }
    return (
      <Paper
        elevation={3}
        style={{
          margin: 'auto',
          width: matchesLg ? '45vw' : matchesMd ? '65vw' : '95vw',
        }}
      >
        <div className={styles.background}>
          <Grid container>
            <Grid item xs={1}>
              <Link to={''} onClickCapture={closeLogin}>
                <CloseIcon />
              </Link>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">Enter your email address</Typography>
              <Link
                style={{ color: '#d52349' }}
                to={''}
                onClickCapture={toggleReset}
              >
                Back to login
              </Link>
            </Grid>
            <Grid item xs={1}></Grid>
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
                onFocus={() => {
                  setData({ ...data, emailError: '', error: '' })
                }}
              />
              {data.error ? <p>{data.error}</p> : null}
              {data.emailError ? <p>{data.emailError}</p> : null}
              <br />
              <br />
            </div>
            <input className={styles.button} type="submit" value="Login" />
          </form>
        </div>
      </Paper>
    )
  }

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
          .then(cred => {
            if (cred) {
              setUser(result)
              setShowLogin(false)
            }
          })
      } catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setData({ ...data, emailError: err.message })
            break
          case 'auth/wrong-password':
            setData({ ...data, passwordError: err.message })
        }
      }
    }
    return (
      <Paper
        elevation={3}
        style={{
          margin: 'auto',
          width: matchesLg ? '45vw' : matchesMd ? '65vw' : '95vw',
        }}
      >
        <div className={styles.background}>
          <Grid container>
            <Grid item xs={1}>
              <Link to={''} onClickCapture={closeLogin}>
                <CloseIcon />
              </Link>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">Not yet a member?</Typography>
              <Link
                style={{ color: '#d52349' }}
                to={''}
                onClickCapture={toggleView}
              >
                Go to register ...
              </Link>
            </Grid>
            <Grid item xs={1}></Grid>
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
                onFocus={() => {
                  setData({ ...data, emailError: '', error: '' })
                }}
              />
              {data.error ? <p>{data.error}</p> : null}
              {data.emailError ? <p>{data.emailError}</p> : null}
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
                onFocus={() => {
                  setData({ ...data, passwordError: '', error: '' })
                }}
              />
              {data.passwordError ? <p>{data.passwordError}</p> : null}
              <br />
              <br />
            </div>
            <input className={styles.button} type="submit" value="Login" />
          </form>
          <Typography variant="body2">Forgot password?</Typography>
          <Link
            style={{ color: '#d52349' }}
            to={''}
            onClickCapture={toggleReset}
          >
            Password reset
          </Link>
        </div>
      </Paper>
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
            .then(cred => {
              firebase
                .firestore()
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
            .then(cred => {
              if (cred) {
                cred.user.updateProfile({
                  displayName: data.displayName,
                })
                setUser(cred)
                setLoginAttempt(true)
                clearFields()
              }
              return cred
            })
            .then(cred => {
              if (cred) {
                firebase.auth().currentUser.sendEmailVerification()
              }
              return cred
            })
            .then(cred => {
              if (cred) {
                setShowSignUpConfirmation(true)
              }
            })
            .catch(err => {
              switch (err.code) {
                case 'auth/invalid-email':
                case 'auth/email-already-in-use':
                  setData({ ...data, emailError: err.message })
                  break
                case 'auth/weak-password':
                  setData({ ...data, passwordError: err.message })
              }
            })
        } catch (err) {
          switch (err.code) {
            case 'auth/invalid-email':
            case 'auth/email-already-in-use':
              setData({ ...data, emailError: err.message })
              break
            case 'auth/weak-password':
              setData({ ...data, passwordError: err.message })
            default:
              setData({ ...data, error: err.message })
          }
        }
      } else {
        setData({
          ...data,
          error: 'Please ensure you have filled all fields correctly',
        })
      }
    }

    return (
      <Paper
        elevation={3}
        style={{
          margin: 'auto',
          width: matchesLg ? '45vw' : matchesMd ? '65vw' : '95vw',
        }}
      >
        <div id={'login'} className={styles.background}>
          <Grid container>
            <Grid item xs={1}>
              <Link to={''} onClickCapture={closeLogin}>
                <CloseIcon />
              </Link>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">Already a member?</Typography>
              <Link
                style={{ color: '#d52349', marginBottom: '2em' }}
                to={''}
                onClickCapture={toggleView}
              >
                Go to login ...
              </Link>
            </Grid>
            <Grid item xs={1}></Grid>
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
                onFocus={() => {
                  setData({ ...data, error: '' })
                }}
              />
              {data.error ? <p>{data.error}</p> : null}
              {data.nameError ? <p>{data.nameError}</p> : null}
              <br />
              <br />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                onFocus={() => {
                  setData({ ...data, emailError: '', error: '' })
                }}
              />
              {data.emailError ? <p>{data.emailError}</p> : null}
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
                onFocus={() => {
                  setData({ ...data, passwordError: '', error: '' })
                }}
              />
              {data.passwordError ? <p>{data.passwordError}</p> : null}
              <br />
              <br />
            </div>
            <input type="submit" style={{ color: 'red' }} value="Register" />
          </form>
        </div>
      </Paper>
    )
  }

  return showSignUp
    ? renderSignUp()
    : showReset
    ? renderResetPassword()
    : renderLogin()
}
