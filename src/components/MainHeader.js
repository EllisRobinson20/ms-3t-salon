import React from 'react'
import * as styles from '../styles/header.module.css'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerImageLg: { 
        maxWidth: '70%', 
        borderRadius: '25px',
    },
    headerImageMd: { 
        maxWidth: '90%', 
        borderRadius: '25px',
    },
    headerImageSm: { 
        maxWidth: '98%', 
        borderRadius: '25px',
    },
}))

export default function MainHeader() {
    const theme = useTheme();
    const classes = useStyles();
    const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const queryData = useStaticQuery(graphql`
        query HeaderImageQuery {
            
                allCloudinaryMedia(sort: {fields: created_at, order: DESC}, filter: {secure_url: {regex: "/salon-theme-header/"}}) {
                  edges {
                    node {
                      id
                      secure_url
                    }
                  }
                }
              
        }
    `)
    const headerPicture = queryData.allCloudinaryMedia.edges[0].node.secure_url

    return (
        <div>
            	<section id={styles.header}>

<h1>Hair by </h1>
<h1><Link className="signature" to="index.html">Ms. 3T Salon</Link></h1>

<section id={styles.banner} className={matchesSm? classes.headerImageSm : matchesMd ? classes.headerImageMd : classes.headerImageLg}  style={{marginLeft: 'auto', 
        marginRight: 'auto',  backgroundImage: 'url('+ headerPicture +')'}}>

</section>
<section id={styles.intro} className={styles.container}>
    <div className={styles.row}>
        <div className={styles.col4+ ' ' +styles.col12medium}>
            <section className={styles.first}>
                <i className={styles.icon}></i>
                <header>
                    <h2>Products</h2>
                </header>
                <p>From haircare to hair acessories</p>
            </section>
        </div>
        <div className={styles.col4+ ' ' +styles.col12medium}>
            <section className={styles.middle}>
                <i className={styles.icon}></i>
                <header>
                    <h2>Hair Services</h2>
                </header>
                <p>Many treatments and styles.</p>
            </section>
        </div>
        <div className={styles.col4+ ' ' +styles.col12medium}>
            <section className={styles.last}>
                <i className={styles.icon}></i>
                <header>
                    <h2>Consultation</h2>
                </header>
                <p>Advice for ongoing haircare</p>
            </section>
        </div>
    </div>
    <footer>
        <ul className={styles.actions}>
            <li><Link to="#" className={styles.button}>Book Now</Link></li>
            <li><Link to="#" className={styles.button}>Shop</Link></li>
        </ul>
    </footer>
</section>

</section>
        </div>
    )
}
