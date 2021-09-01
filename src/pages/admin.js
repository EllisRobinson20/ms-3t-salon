import React, {useContext} from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { NavigationContext } from "../context/NavigationContext";

import Diary from '../components/Diary'

export default function Admin({location}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    return (
        <div>
            <Layout>
                <SEO title="Admin" />
                <Diary/>
            </Layout>
        </div>
    )
}
