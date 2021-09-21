import React, {createContext, useState, useEffect} from 'react'
import {graphql , useStaticQuery} from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { async } from '@firebase/util'
import { get } from 'lodash'

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
    const [loginAttempt, setLoginAttempt] = useState(false)
    const [deviceIsMobile, setDeviceIsMobile] = useState()
    const [profile, setProfile] = useState({})
    const [admin, setAdmin] = useState(false)
    const [memberInfo, setMemberInfo] = useState()

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
            console.log("changed auth to -> " )
            console.log(user)
            if (!user) {setProfile({}) 
        console.log("user out")
        setAdmin(false)
        setMemberInfo({})
    }
            else {
                // get member object is for setting additional properties though there is an less erroneous way to do this
                //getMemberObject()
                user.getIdTokenResult().then(idTokenResult => {
                    setAdmin(idTokenResult.claims.admin ? true : false)
                  }).then(() => {
                    return firebase.firestore().collection('members').doc(user.uid).get()
                  }).then((ref) => {
                        return ref.data()
                  }).then((userProfile) => {
                    setMemberInfo(userProfile)
                  })       
            }
            if (showLogin) {setShowLogin(false)} 
        })
    }, [])
    useEffect(() => {
        if (user) { 
            firebase.auth().onAuthStateChanged(user => {
                setUser(user)
                console.log("changed auth to -> " )
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
        }
    }, [loginAttempt])
    return (
        <AuthContext.Provider value={{user, setUser,
            showLogin, setShowLogin,
            loginAttempt, setLoginAttempt,
            deviceIsMobile, setDeviceIsMobile,
            profile, setProfile,
            admin, setAdmin,
            memberInfo, setMemberInfo,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider