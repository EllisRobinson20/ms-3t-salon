import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../context/AuthContext'

const isBrowser = typeof window !== 'undefined'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // context
  const { user } = useContext(AuthContext)
  const { setShowLogin } = useContext(AuthContext)
  if (isBrowser) {
    if (!user && setShowLogin !== true) {
      setShowLogin(true)
      navigate('../../')
      return null
    }
  }
  return <Component {...rest} />
}

export default PrivateRoute
