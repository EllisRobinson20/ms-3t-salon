import React, {createContext, useState, useEffect} from 'react'
import ProfileContextProvider from './ProfileContext'
import  AuthContextProvider  from './AuthContext'
import BookingContextProvider from './BookingContext'

export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    return (
        <>
        <AuthContextProvider>
            <ProfileContextProvider>
                <BookingContextProvider>
                        {children}
                </BookingContextProvider>
            </ProfileContextProvider>     
        </AuthContextProvider>
        </>
    )
}
export default GlobalProvider