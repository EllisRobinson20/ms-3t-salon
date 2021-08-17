import React from 'react'
import * as styles from '../styles/header.module.css'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Profile from '../components/Profile'
import { node } from 'prop-types'

export default function MainHeader() {
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
    const header = queryData.allCloudinaryMedia.edges[0]

    return (
        <div>
            	<section id={styles.header}>


<h1>Hair by </h1>
<h1><Link className="signature" to="index.html">Ms. 3T Salon</Link></h1>





<section id={styles.banner}  style={{backgroundImage: 'url('+ headerPicture +')'}}>

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
                    <h2>Blog</h2>
                </header>
                <p>Topics and guides for ongoing care</p>
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
