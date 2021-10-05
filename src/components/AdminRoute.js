import React, { useContext, useLayoutEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import { Card } from '@material-ui/core'

const isBrowser = typeof window !== 'undefined'

const AdminRoute = ({ component: Component, location, ...rest }) => {
  const { user } = useContext(AuthContext)
  const { admin } = useContext(AuthContext)
  const [userAllowed, setUserAllowed] = useState(false)

  useLayoutEffect(() => {
      setUserAllowed(admin ? true : false)
  })

  const RestrictedAccess = () => (
    <Card>
      <h1>Restricted Access</h1>
    </Card>
  )
  return userAllowed ? <Component {...rest} /> : <RestrictedAccess />
}

export default AdminRoute
