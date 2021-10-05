import React, {useContext} from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/header.module.css'
import { NavigationContext } from "../context/NavigationContext";
import { AuthContext } from '../context/AuthContext';
const isBrowser = typeof window !== "undefined"


export default function Nav() {
    const {thisPage} = useContext(NavigationContext);
    const {admin} = useContext(AuthContext);
    

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
            {admin ? 
            <>
            <li className={thisPage === "/admin" || thisPage === "/admin/diary" ? styles.current : null}>
            <Link to="/admin">Diary</Link>
        </li>
        <li className={thisPage === "/admin/consultation" ? styles.current : null}>
            <Link to="/admin/consultation">Consultation</Link>
        </li>
        </>
        :
<>
</>
        }
            
        </ul>
        </nav>
        </div>
    )
}

//<li className={thisPage === "/blog" ? styles.current : null}>
//<Link to="/blog">Blog</Link>
//</li>
//
