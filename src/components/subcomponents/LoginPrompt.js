import { Grid, Link, Typography } from '@material-ui/core'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function LoginPrompt() {
    const {setShowLogin} = useContext(AuthContext)
    const openLogin = () => {
        // set login state to true
        setShowLogin(true)
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        You need to be logged in for access!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link href="#" onClick={openLogin}>Login</Link>
                </Grid>
            </Grid>
        </div>
    )
}
