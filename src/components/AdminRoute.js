import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Card } from '@material-ui/core'

const isBrowser = typeof window !== 'undefined'

const AdminRoute = ({ component: Component, location, ...rest }) => {
  // state
  const [userAllowed, setUserAllowed] = useState(false)
  // context
  const { admin } = useContext(AuthContext)
  // side effects
  useLayoutEffect(() => {
    setUserAllowed(admin ? true : false)
  })
  // functions
  const RestrictedAccess = () => (
    <Card>
      <h1>Restricted Access</h1>
    </Card>
  )
  return userAllowed ? <Component {...rest} /> : <RestrictedAccess />
}

export default AdminRoute
