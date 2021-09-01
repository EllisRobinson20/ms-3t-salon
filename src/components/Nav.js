import React, {useContext} from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/header.module.css'
import { NavigationContext } from "../context/NavigationContext";


export default function Nav() {
    const {thisPage} = useContext(NavigationContext);
    

    return (
        <div>
        <nav id={styles.nav}>
        <ul>
            <li className={thisPage === "/" ? styles.current : null}>
                <Link to="/">Home</Link>
            </li>
            <li className={thisPage === "/salon" ? styles.current : null}>
                <Link to="/salon">Salon</Link>
            </li>
            <li className={thisPage === "/shop" ? styles.current : null}>
                <Link to="/shop">Shop</Link>
            </li>
            <li className={thisPage === "/about" ? styles.current : null}>
                <Link to="/about">About</Link>
            </li>
            <li className={thisPage === "/blog" ? styles.current : null}>
                <Link to="/blog">Blog</Link>
            </li>
        </ul>
        </nav>
        </div>
    )
}
