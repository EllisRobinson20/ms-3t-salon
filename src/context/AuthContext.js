import React, {createContext, useState, useEffect} from 'react'
import {graphql , useStaticQuery} from 'gatsby'
import firebase from 'gatsby-plugin-firebase'

export  const AuthContext = createContext({})

const AuthContextProvider = ({ children }) => {
    const data = useStaticQuery(graphql`
    query AuthContexttQuery {
        allMembers {
          edges {
            node {
              id
              name
              email
              durationService
              costServicePence
              defaultService
              givenReview
              telephone
              userConsulted
            }
          }
        }
      }
    `)
    const [user, setUser] = useState()
    const [showLogin, setShowLogin] = useState(false)
    const [deviceIsMobile, setDeviceIsMobile] = useState()
    const [profile, setProfile] = useState({})

    const getMemberObject = () => {
        const member = data.allMembers.edges.map((edge) => {
            if (edge.node.email === user.email) {
                const node = edge.node
                console.log("auth context creating member object")
                setProfile({
                    id: node.id,
                    name: node.name,
                    email: node.email,
                    durationService: node.durationService,
                    costServicePence: node.costServicePence,
                    defaultService: node.defaultService,
                    givenReview: node.givenReview,
                    telephone: node.telephone,
                    userConsulted: node.userConsulted,
                })
                console.log(profile)
            }
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {setUser(user)
            if (!user) {setProfile({})}
            else {
                getMemberObject()}
            if (showLogin) {setShowLogin(false)}
            console.log(user)
            console.log(showLogin)
        })
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser,
            showLogin, setShowLogin,
            deviceIsMobile, setDeviceIsMobile,
            profile, setProfile,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider