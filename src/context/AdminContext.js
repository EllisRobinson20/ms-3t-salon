import React, { createContext, useState, useEffect } from 'react'
import { startOfWeek, add } from 'date-fns'

export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {
  const [userObject, setUserObject] = useState()
  const [datePicker, setDatePicker] = useState(new Date())

  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  useEffect(() => {
    if (datePicker !== null) {
      setDateStart(startOfWeek(new Date(datePicker), { weekStartsOn: 1 }))
      setDateEnd(
        add(startOfWeek(new Date(datePicker), { weekStartsOn: 1 }), { days: 5 })
      )
    }
  }, [datePicker])

  return (
    <AdminContext.Provider
      value={{
        userObject,
        setUserObject,
        datePicker,
        setDatePicker,
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
export default AdminContextProvider
