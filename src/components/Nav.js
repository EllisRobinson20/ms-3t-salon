import React, {useContext} from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/header.module.css'


export default function Nav() {

    

    return (
        <div>
        <nav id={styles.nav}>
        <ul>
            <li className={styles.current}><Link to="/">Home</Link></li>
            <li>
                <Link to="/salon">Salon</Link>
            </li>
            <li><Link to="left-sidebar.html">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="no-sidebar.html">Blog</Link></li>
        </ul>
        </nav>
        </div>
    )
}
