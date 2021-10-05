import React, { createContext, useState, useEffect } from 'react'

export const NavigationContext = createContext()

const NavigationContextProvider = ({ children }) => {
  const [pageState, setPageState] = useState('/')
  const [thisPage, setThisPage] = useState('/')
  const [lastPage, setLastPage] = useState('/')

  useEffect(() => {
    const newPage = thisPage !== pageState
    if (newPage) {
      setLastPage(thisPage)
      setThisPage(pageState)
    }
  }, [pageState])

  return (
    <NavigationContext.Provider
      value={{
        pageState,
        setPageState,
        thisPage,
        setThisPage,
        lastPage,
        setLastPage,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
export default NavigationContextProvider
