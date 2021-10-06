/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import './layout.css'
import { NavigationContext } from '../context/NavigationContext'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import Footer from './Footer'
import AlertDialog from './subcomponents/AlertDialog'
import { DialogContent } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';


const Layout = ({ children }) => {
const {showLogin} = useContext(AuthContext)
const {showSignUpConfirmation, setShowSignUpConfirmation} = useContext(AuthContext)
const {deviceIsMobile, setDeviceIsMobile} = useContext(AuthContext)
const {thisPage} = useContext(NavigationContext)

useEffect(() => {
  {setDeviceIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))}
})

const closeAlertDialog = () => {
  setShowSignUpConfirmation(false)
}

const renderLayout = () => {
  return (
            
            <>
              <Header />
              <main>{children}</main>
              {thisPage === "/salon" && deviceIsMobile ||thisPage === "/salon/" && deviceIsMobile || thisPage === "/admin/consultation" || thisPage === "/admin" ? "" : <Footer/>}
            </>
                
  )
}

  return (
    <>
      <div style={{ backgroundColor: '#FFF' }}>
        <div
          style={{
            textAlign: `center`,
            margin: `0 auto`,
            padding: `0`,
            paddingTop: 80,
          }}
        >
        {showLogin ? <Login/>: renderLayout()}
        <AlertDialog openDialog={showSignUpConfirmation} action={closeAlertDialog}>
      <DialogTitle>{"A verification email has been sent to you"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please go to your inbox and click the verify link 
            to confirm and enable your account.
          </DialogContentText>
        </DialogContent>
      </AlertDialog>
        <script src="/__/firebase/8.10.0/firebase-app.js"></script>
        <script src="/__/firebase/8.10.0/firebase-analytics.js"></script>
        <script src="/__/firebase/init.js"></script>
        </div>
      </div>
    </>     
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
