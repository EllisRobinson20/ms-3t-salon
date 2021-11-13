import React, { useState } from 'react'
import * as styles from '../styles/header.module.css'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  headerImageXl: {
    maxWidth: '65%',
    borderRadius: '25px',
  },
  headerImageLg: {
    maxWidth: '65%',
    borderRadius: '25px',
  },
  headerImageMd: {
    maxWidth: '85%',
    borderRadius: '25px',
  },
  headerImageSm: {
    maxWidth: '98%',
    borderRadius: '25px',
  },
}))

export default function MainHeader() {
  const theme = useTheme()
  const classes = useStyles()
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const matchesLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

  const [headerClick, setHeaderClick] = useState(["Book Now", "/salon/"])
  const queryData = useStaticQuery(graphql`
    query HeaderImageQuery {
      allCloudinaryMedia(
        sort: { fields: created_at, order: DESC }
        filter: { secure_url: { regex: "/salon-theme-header/" } }
      ) {
        edges {
          node {
            id
            secure_url
          }
        }
      }
    }
  `)
  const headerPicture = (sm, md, xl) => {
    switch(sm, md, xl) {
      case sm:
        return 'https://res.cloudinary.com/dq9anzbe3/image/upload/c_scale,w_1226/v1628855279/salon/salon-theme-header/salon4.jpg';
      case md:
        return queryData.allCloudinaryMedia.edges[0].node.secure_url
      case xl:
        return queryData.allCloudinaryMedia.edges[0].node.secure_url
      default:
        return queryData.allCloudinaryMedia.edges[0].node.secure_url
    }
  }
  

  return (
    <div>
      <section id={styles.header}>
        <h1>Hair by </h1>
        <h2>
          <Link className="signature large" to="index.html">
            Ms.3T Salon
          </Link>
        </h2>

        <section
          id={styles.banner}
          className={
            matchesSm
              ? classes.headerImageSm
              : matchesMd
              ? classes.headerImageMd
              : matchesLg
              ? classes.headerImageLg
              : classes.headerImageXl
          }
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundImage: 'url(' + headerPicture(smDown, mdDown, lgDown) + ')',
          }}
        ></section>
        <section id={styles.intro} className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col4 + ' ' + styles.col12medium}>
              <section
                onClick={() => {
                  setHeaderClick(["Shop", "/shop/"])
                }}
                className={styles.middle}
              >
                <i className={styles.icon}></i>
                <header>
                  <h2>Products</h2>
                </header>
                <p>From haircare to hair acessories</p>
              </section>
            </div>
            <div className={styles.col4 + ' ' + styles.col12medium}>
              <section onClick={() => {
                setHeaderClick(["Book Now", "/salon/"])
              }} className={styles.middle}>
                <i className={styles.icon}></i>
                <header>
                  <h2>Hair Services</h2>
                </header>
                <p>Many treatments and styles.</p>
              </section>
            </div>
            <div className={styles.col4 + ' ' + styles.col12medium}>
              <section onClick={() => {
                setHeaderClick(["Consultation", "#contact"])
              }} className={styles.middle}>
                <i className={styles.icon}></i>
                <header>
                  <h2>Consultation</h2>
                </header>
                <p>Advice for ongoing haircare</p>
              </section>
            </div>
          </div>
          <ul className={styles.actions}>
            <li>
              <Link to={headerClick[1]} className={styles.button}>
                {headerClick[0]}
              </Link>
            </li>
          </ul>
        </section>
      </section>
    </div>
  )
}
