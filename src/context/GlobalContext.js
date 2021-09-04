import React, {createContext} from 'react'
import ProfileContextProvider from './ProfileContext'
import AuthContextProvider from './AuthContext'
import BookingContextProvider from './BookingContext'
import NavigationContextProvider from './NavigationContext'

export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    return (
        <>
        <NavigationContextProvider>
        <AuthContextProvider>
            <ProfileContextProvider>
                <BookingContextProvider>
                        {children}
                </BookingContextProvider>
            </ProfileContextProvider>     
        </AuthContextProvider>
        </NavigationContextProvider>
        </>
    )
}
export default GlobalProvider