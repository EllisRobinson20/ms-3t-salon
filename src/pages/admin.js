import React, {useContext} from 'react'
import Layout from '../components/Layout'
import { NavigationContext } from "../context/NavigationContext";
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute'
import Consultation from '../components/Consultation';
import Diary from '../components/Diary'
import CreateAdmin from '../components/CreateAdmin';
import AdminRoute from '../components/AdminRoute';

export default function Admin({location}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    return (
        <div>
            <Layout>
                <Router >
                    <AdminRoute path="/admin/"component={Diary}></AdminRoute>
                    <AdminRoute path="/admin/create" component={CreateAdmin}></AdminRoute>
                    <AdminRoute path="/admin/diary" component={Diary}></AdminRoute>
                    <AdminRoute path="/admin/consultation" component={Consultation}></AdminRoute>
                </Router>
            </Layout>
        </div>
    )
}

