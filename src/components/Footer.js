import clsx from 'clsx'
import React, {useContext} from 'react'
import * as styles from '../styles/header.module.css'
import { AuthContext } from '../context/AuthContext'
import { Button, IconButton } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call';
import FacebookIcon from '@material-ui/icons/Facebook';
import { graphql, Link, useStaticQuery } from 'gatsby'

export default function Footer() {
    const {deviceIsMobile, setDeviceIsMobile} = useContext(AuthContext)
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
        <div>
            <section id={styles.footer} style={{backgroundColor: "#252122"}}>
					<div className={styles.container}>
						<div className={styles.row}>
							<div className={clsx(styles.col8, styles.col12Medium) }>
								<section>
									<header>
										<h2>Our location</h2>
									</header>
									<img src={mapImage.allCloudinaryMedia.edges[0].node.secure_url} alt={"where to find us"}/>
								</section>
							</div>
							<div className={clsx(styles.col4, styles.col12Medium) }>
                            <section>
									<header>
										<h2>Contact us</h2>
									</header>
									<ul className={styles.social}>
										
									</ul>
									<ul className={styles.contact}>
										<li>
											<h3>Address</h3>
											<p>
												Miss 3T Salon<br />
												15B King Street<br />
												Sutton-Ashfield, NG17 1AT
											</p>
										</li>
                                        <li style={{textAlign: "right"}}>
											<h3>Hours</h3>
                                            <p><strong>Monday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Tuesday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Wednesday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Thursday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Friday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Saturday: </strong> 9:00am - 4:30pm</p>
                                            <p><strong>Sunday: </strong> closed </p>
                                            
											
										</li>
										<li>
											<h3>Facebook</h3>
                                            <a target={"_blank"} href={"https://www.facebook.com/Ms-3T-Salon-105060704338984"}>
                                                <IconButton aria-label={"call"}>
                                                        <FacebookIcon/>
                                                </IconButton></a>
											<p></p>
										</li>
										<li>
											<h3>Phone</h3>
                                            {deviceIsMobile ? 
                                            <p><Button onclick={window.open('tel:07517140732')}>
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
							</div>
							<div className={clsx(styles.col4, styles.col6Medium, styles.col12Small)}>
								<section>
									
								</section>
							</div>
							<div className={clsx(styles.col4, styles.col6Medium, styles.col12Small) }>
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
