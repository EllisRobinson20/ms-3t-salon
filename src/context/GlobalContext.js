import React, {createContext, useState, useEffect} from 'react'
import ProfileContextProvider from './ProfileContext'
import  AuthContextProvider  from './AuthContext'

export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    return (
        <>
        <AuthContextProvider>
            <ProfileContextProvider>
                        {children}
            </ProfileContextProvider>     
        </AuthContextProvider>
        </>
    )
}
export default GlobalProvider