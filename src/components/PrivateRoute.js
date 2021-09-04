import React, {useContext} from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/AuthContext"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const {user} = useContext(AuthContext);
  const {login, setShowLogin} = useContext(AuthContext);
  if (!user && setShowLogin !== true) {
    setShowLogin(true)
    navigate("../../")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute