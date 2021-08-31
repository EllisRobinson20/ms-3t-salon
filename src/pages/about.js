import { Grid, Typography, Modal, Backdrop} from '@material-ui/core'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core';
import Layout from '../components/Layout';
import * as styles from '../styles/header.module.css'
import CardCarousel from '../components/subcomponents/CardCarousel';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: "#FFF",
      padding: '2em 1em 2em',
    },
    description: {
        margin: '0.5em 0',
    },
    buttons: {
        marginTop: '0.5em 0'
    },
    modal: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      },
      paper: {
        
      },
  }));

export default function About({data}) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const headerImage = data.header.edges[0].node.secure_url;

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    
    return (
        <Layout >
        <div className={classes.root}>
            <Grid container spacing={8} justifyContent="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <img className={classes.headerImage} src={headerImage} alt="Latoya, founder and hair stylist at the salon"/>
                </Grid>
                <Grid item xs={12} lg={3} container direction="column" spacing={4} row>
                    <Typography className={classes.description} variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                        <Link to="#" className={styles.button}>View Prices</Link>
                        <Link to="#" className={styles.button} onClick={handleOpen}>Gallery</Link>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 300,
                
                }}
            >
                    <div className={classes.paper}> 
                    <CardCarousel data={data.gallery.edges} type={"gallery"} />
                    </div>
            </Modal>
            
        </div>
        </Layout>
    )
}
export const query = graphql`
    query AboutPageImageQuery {
                
        header: allCloudinaryMedia(sort: {fields: created_at, order: DESC}, filter: {secure_url: {regex: "/stylists/demo/"}}) {
        edges {
            node {
            id
            secure_url
            }
        }
        }
        gallery: allCloudinaryMedia(sort: {fields: created_at, order: DESC}, filter: {secure_url: {regex: "/clients/"}}) {
            edges {
                node {
                id
                secure_url
                }
            }
            }
    }
`
