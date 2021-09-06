/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, {useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import './layout.css'
import { NavigationContext } from '../context/NavigationContext'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import Footer from './Footer'


const Layout = ({ children }) => {
const {showLogin} = useContext(AuthContext)
const {setDeviceIsMobile} = useContext(AuthContext)
const {thisPage} = useContext(NavigationContext)

useEffect(() => {
  {setDeviceIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))}
})



const renderLayout = () => {
  return (
            <StaticQuery
              query={graphql`
                query SiteTitleQuery {
                  site {
                    siteMetadata {
                      title
                    }
                  }
                }
              `}
            render={data => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <main>{children}</main>
              {thisPage === "/salon" || thisPage === "/admin/consultation" ? "" : <Footer/>}
            </>
            )}
            />    
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
