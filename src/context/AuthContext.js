import React, {createContext, useState, useEffect} from 'react'
import firebase from 'gatsby-plugin-firebase'

export  const AuthContext = createContext({})

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [showLogin, setShowLogin] = useState(false)
    const [deviceIsMobile, setDeviceIsMobile] = useState()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {setUser(user)
            if (showLogin) {setShowLogin(false)}
            console.log(user)
            console.log(showLogin)
        })
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser,
            showLogin, setShowLogin,
            deviceIsMobile, setDeviceIsMobile}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider