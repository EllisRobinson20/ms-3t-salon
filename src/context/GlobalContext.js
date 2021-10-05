import React, { createContext } from 'react'
import ProfileContextProvider from './ProfileContext'
import AuthContextProvider from './AuthContext'
import BookingContextProvider from './BookingContext'
import NavigationContextProvider from './NavigationContext'
import AdminContextProvider from './AdminContext'

export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
  return (
    <>
      <AdminContextProvider>
        <NavigationContextProvider>
          <AuthContextProvider>
            <ProfileContextProvider>
              <BookingContextProvider>{children}</BookingContextProvider>
            </ProfileContextProvider>
          </AuthContextProvider>
        </NavigationContextProvider>
      </AdminContextProvider>
    </>
  )
}
export default GlobalProvider
