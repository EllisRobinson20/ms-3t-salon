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
    const [admin, setAdmin] = useState(false)

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
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)
            console.log("chaned auth to -> " )
            console.log(user)
            if (!user) {setProfile({}) 
        console.log("user out")
        setAdmin(false)
    }
            else {
                // get member object is for setting additional properties though there is an less erroneous way to do this
                //getMemberObject()
                user.getIdTokenResult().then(idTokenResult => {
                    setAdmin(idTokenResult.claims.admin ? true : false)
                  })

            }
            if (showLogin) {setShowLogin(false)}
            
        })
    }, [])
    useEffect(() => {
        if (user) {
            
        }
    }, [user])
    return (
        <AuthContext.Provider value={{user, setUser,
            showLogin, setShowLogin,
            deviceIsMobile, setDeviceIsMobile,
            profile, setProfile,
            admin, setAdmin,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider