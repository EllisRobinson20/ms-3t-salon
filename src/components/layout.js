/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

import { AuthContext } from '../context/AuthContext'
import Login from './Login'


const Layout = ({ children }) => {
  const {user, setUser} = useContext(AuthContext)
const {showLogin, setShowLogin} = useContext(AuthContext)

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
              <footer style={{ paddingTop: 10 }}>
                © {new Date().getFullYear()}, Website by
                {` `}
                <a href="https://www.gatsbyjs.org">Lee Ellis</a>
              </footer>
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
            padding: `0 0 1.45rem`,
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
