import clsx from 'clsx'
import React, {useContext} from 'react'
import * as styles from '../styles/header.module.css'
import { AuthContext } from '../context/AuthContext'
import { Button, Grid, IconButton } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call';
import FacebookIcon from '@material-ui/icons/Facebook';
import { graphql, Link, useStaticQuery } from 'gatsby'
import OpeningTimes from './subcomponents/OpeningTimes'

export default function Footer() {
    const callSalon = () => {
        window.open('tel:07517140732')
    }
    const {deviceIsMobile} = useContext(AuthContext)
    const mapImage = useStaticQuery(graphql`
        query MapLocationQuery {
            
                allCloudinaryMedia(sort: {fields: created_at, order: DESC}, filter: {secure_url: {regex: "/location/map/"}}) {
                  edges {
                    node {
                      id
                      secure_url
                    }
                  }
                }
              
        }
    `)
    return (
        <div style={{backgroundColor: "#252122"}}>
            <section id={styles.footer} >
					<Grid container justifyContent="center" >
						<Grid item xs={11} sm={10} md={8} lg={4}>
						<section>
								<header>
									<h2>Want to know more?</h2>
								</header>
								<a href="#" className={styles.image, styles.featured}><img src="images/pic10.jpg" alt="" /></a>
								<p>
									If you want to see a list of prices and styles available just go to our <strong>Salon page</strong>.
									New styles may not be listed so be sure to enquire if you do not see what you're looking for. You can book online,
									give us a call, or send a message via facebook.
								</p>
								<footer>
									<ul className={styles.actions}>
										<Link to="/salon" className={styles.button}>Salon page</Link>
									</ul>
								</footer>
							</section>
						</Grid>
						<Grid item container xs={10} spacing={6}>
							<Grid item xs={12} md={8}>
							<section>
									<header style={{textAlign: "left"}}>
										<h2>Our location</h2>
									</header>
									<img src={mapImage.allCloudinaryMedia.edges[0].node.secure_url} alt={"where to find us"}/>
								</section>
							</Grid>
							<Grid item xs={12} md={4}>
							<section>
									<header style={{textAlign: "right"}}>
										<h2 >Contact us</h2>
									</header>
									<ul className={styles.social}>
										
									</ul>
									<ul className={styles.contact}>
										<li>
											<h3>Address</h3>
											<p style={{textAlign: "right"}}>
												Miss 3T Salon<br />
												15B King Street<br />
												Sutton-Ashfield<br/>
												NG17 1AT
											</p>
										</li>
                                        <li style={{textAlign: "right"}}>
											<h3>Hours</h3>
                                            <OpeningTimes/>
										</li>
										<li style={{textAlign: "right"}}>
											<h3>Facebook</h3>
                                            <a target={"_blank"} href={"https://www.facebook.com/Ms-3T-Salon-105060704338984"}>
                                                <IconButton aria-label={"call"}>
                                                        <FacebookIcon/>
                                                </IconButton></a>
											<p></p>
										</li>
										<li style={{textAlign: "right"}}>
											<h3>Phone</h3>
                                            {deviceIsMobile ? 
                                            <p><Button onClick={callSalon}>
                                                    <IconButton aria-label={"call"}>
                                                        <CallIcon/>
                                                    </IconButton>
                                                </Button> 07517140732</p>
                                            :
                                            <p>07517140732</p>
                                            }
										</li>
									</ul>
								</section>
							</Grid>
						</Grid>
					</Grid>
					<div className={styles.container}>
					<div className={clsx(styles.col4, styles.col6Medium, styles.col12Small) }>
						


						</div>
						<div className={styles.row}>
							<div className={clsx(styles.col8, styles.col12Medium) }>
								
							</div>
							<div className={clsx(styles.col4, styles.col12Medium) }>
                            
							</div>
							<div className={clsx(styles.col4, styles.col6Medium, styles.col12Small)}>
								<section>
									
								</section>
							</div>
							<div className={clsx(styles.col4, styles.col12Medium)}>
                            <section>
									
								</section>
							</div>
							<div className={styles.col12}>

									<div id={styles.copyright}>
										<ul className={styles.links}>
                                        © {new Date().getFullYear()}, Website by
                                        {` `}
                                        <a href="https://www.gatsbyjs.org">Lee Ellis</a>
											<li>Courtesy of <a href="http://html5up.net">HTML5 UP</a></li>
										</ul>
									</div>
							</div>
						</div>
					</div>
				</section>
        </div>
    )
}
