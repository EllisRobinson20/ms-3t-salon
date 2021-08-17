import React, {createContext, useState, useEffect} from 'react'
import ProfileContext from './ProfileContext'

export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    return (
        <>
        <ProfileContext>
                    {children}
        </ProfileContext>     
        </>
    )
}
export default GlobalProvider