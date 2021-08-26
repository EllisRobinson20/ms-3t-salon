import { Grid, Typography } from '@material-ui/core'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core';
import Layout from '../components/Layout';
import * as styles from '../styles/header.module.css'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: "#FFF",
      padding: '4em 1em 0',
    },
    description: {
        margin: '0.5em 0',
    },
    buttons: {
        marginTop: '0.5em 0'
    },
  }));

export default function About({data}) {
    
    const classes = useStyles();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const headerImage = data.allCloudinaryMedia.edges[0].node.secure_url;
    // head shot of stylist
    
    return (
        <Layout >
        <div className={classes.root}>
            <Grid container spacing={8} justifyContent="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={matchesSm ? 12 : 6}>
                    <img className={classes.headerImage} src={headerImage} alt="Latoya, founder and hair stylist at the salon"/>
                </Grid>
                <Grid item xs={matchesSm ? 12: 3} container direction="column" spacing={4} row>
                    <Typography className={classes.description} variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                        <Link to="#" className={styles.button}>View Prices</Link>
                        <Link to="#" className={styles.button}>Gallery</Link>
                </Grid>
            </Grid>
        </div>
        </Layout>
    )
}
export const query = graphql`
    query AboutPageHeadshotQuery {
                
        allCloudinaryMedia(sort: {fields: created_at, order: DESC}, filter: {secure_url: {regex: "/stylists/demo/"}}) {
        edges {
            node {
            id
            secure_url
            }
        }
        }
    
    }
`
