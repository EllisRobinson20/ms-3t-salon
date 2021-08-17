import React, {useContext} from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/header.module.css'


export default function Nav() {

    

    return (
        <div>
        <nav id={styles.nav}>
        <ul>
            <li className={styles.current}><Link to="index.html">Home</Link></li>
            <li>
                <Link to="#">Salon</Link>
                <ul>
                    <li><Link to="#">Lorem ipsum dolor</Link></li>
                    <li><Link to="#">Magna phasellus</Link></li>
                    <li><Link to="#">Etiam dolore nisl</Link></li>
                    <li>
                        <Link to="#">Phasellus consequat</Link>
                        <ul>
                            <li><Link to="#">Magna phasellus</Link></li>
                            <li><Link to="#">Etiam dolore nisl</Link></li>
                            <li><Link to="#">Veroeros feugiat</Link></li>
                            <li><Link to="#">Nisl sed aliquam</Link></li>
                            <li><Link to="#">Dolore adipiscing</Link></li>
                        </ul>
                    </li>
                    <li><Link to="#">Veroeros feugiat</Link></li>
                </ul>
            </li>
            <li><Link to="left-sidebar.html">Shop</Link></li>
            <li><Link to="right-sidebar.html">About</Link></li>
            <li><Link to="no-sidebar.html">Blog</Link></li>
        </ul>
        </nav>
        </div>
    )
}
