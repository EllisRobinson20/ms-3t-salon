/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import "firebase/auth"
import "firebase/firestore"
import React from 'react'
import GlobalProvider from "./src/context/GlobalContext"
require('typeface-roboto');


export const wrapRootElement = ({element}) => (
    <GlobalProvider>{element}</GlobalProvider>
)