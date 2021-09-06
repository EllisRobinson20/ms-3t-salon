import { Grid, Link, Typography } from '@material-ui/core'
import React from 'react'

export default function LoginPrompt() {
    const openLogin = () => {
        // set login state to true
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
