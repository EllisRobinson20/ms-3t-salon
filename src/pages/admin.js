import React, {useContext} from 'react'
import Layout from '../components/Layout'
import { NavigationContext } from "../context/NavigationContext";
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute'
import Consultation from '../components/Consultation';
import Diary from '../components/Diary'

export default function Admin({location}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    return (
        <div>
            <Layout>
                <Router >
                    <PrivateRoute path="/diary" component={Diary} />
                    <Consultation path="/admin/consultation"/>
                </Router>
            </Layout>
        </div>
    )
}
