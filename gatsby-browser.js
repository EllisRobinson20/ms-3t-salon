/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
 import React from 'react'
 import GlobalProvider from "./src/context/GlobalContext"
require('typeface-roboto');


export const wrapRootElement = ({element}) => (
    <GlobalProvider>{element}</GlobalProvider>
)