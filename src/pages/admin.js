import React, {useContext} from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { NavigationContext } from "../context/NavigationContext";
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute'

import Diary from '../components/Diary'

export default function Admin({location}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    return (
        <div>
            <Layout>
                <Router basepath="admin">
                    <PrivateRoute path="/diary" component={Diary} />
                </Router>
            </Layout>
        </div>
    )
}
