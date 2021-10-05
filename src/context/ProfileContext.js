import React, {createContext, useState} from 'react'

export const ProfileContext = createContext();

const ProfileContextProvider = ({children}) => {

    const [showProfile, setShowProfile] = useState(false);

    return (
        <ProfileContext.Provider value={{showProfile, setShowProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}
export default ProfileContextProvider


