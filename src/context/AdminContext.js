import React, {createContext, useState, useEffect} from 'react'

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {
    
    const [userObject, setUserObject] = useState();

    

    return (
        <AdminContext.Provider value={{
            userObject, setUserObject,
            }}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider


