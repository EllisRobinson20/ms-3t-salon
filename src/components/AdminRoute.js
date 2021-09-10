import React, { useContext, useState } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import { Card } from '@material-ui/core'

const isBrowser = typeof window !== 'undefined'

const AdminRoute = ({ component: Component, location, ...rest }) => {
  const { user } = useContext(AuthContext)
  const [userAllowed, setUserAllowed] = useState(false)

  const RestrictedAccess = () => (
    <Card>
      <h1>Restricted Access</h1>
    </Card>
  )
  if (isBrowser) {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        setUserAllowed(idTokenResult.claims.admin ? true : false)
        console.log('userAllowed ... ')
        console.log(userAllowed)
      })
    }
  }
  return userAllowed ? <Component {...rest} /> : <RestrictedAccess />
}

export default AdminRoute
