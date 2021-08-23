import React, {useState, useContext} from 'react'
import Layout from '../components/Layout'
import firebase from 'gatsby-plugin-firebase'
import { AuthContext } from '../context/AuthContext'
import { Link, navigate } from '@reach/router'
import * as styles from '../styles/login.module.css'




export default function Login() {
    const toggleView = (e) => {
        e.preventDefault()
        setShowSignUp(!showSignUp)
    }
    const closeLogin = (e) => {
        e.preventDefault()
        setShowLogin(false)
    }

    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
    })
    
    const {setUser} = useContext(AuthContext)
    const {setShowLogin} = useContext(AuthContext)

    const [showSignUp, setShowSignUp] = useState(false)
    
    
    const renderLogin = () => {
        const handleChange = e => {
            setData({ ...data, [e.target.name]: e.target.value })
            }
            
            const handleSubmit = async e => {
                e.preventDefault()
                setData({ ...data, error: null })
                try {
                    const result = await firebase
                        .auth()
                        .signInWithEmailAndPassword(data.email, data.password)
                    setUser(result)
                    setShowLogin(false)
                } catch (err) {
                    setData({ ...data, error: err.message})
                }
            }
        return (
        <div className={styles.background}>
            <Link to={""} onClickCapture={closeLogin}>Close</Link>
            <Link to={""} onClickCapture={toggleView}>Not yet a member? Register here.</Link>
            <form onSubmit={handleSubmit}>
                <div>
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input type="text" name="email" value={data.email} onChange={handleChange}/>
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <label htmlFor="email">Password</label>
                        <br/>
                        <input type="password" name="password" value={data.password} onChange={handleChange}/>
                        <br/>
                        <br/>
                    </div>
                    {data.error ? <p>{data.error}</p> : null }
                    <input type="submit" value="Login" />
            </form>
        </div>
        )
    }
    const renderSignUp = () => {
        const handleChange = e => {
            setData({ ...data, [e.target.name]: e.target.value })
        }
        
        const handleSubmit = async e => {
            e.preventDefault()
            setData({ ...data, error: null })
            if (data.displayName){
            try {
                const result = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password)
                   
                result.user.updateProfile({
                        displayName: data.displayName
                    })
                setUser(result)
                console.log(result)
                navigate("../")
            } catch (err) {
                setData({ ...data, error: err.message})
            }
        } else {
            setData({ ...data, error: "You forgot to fill in the name field"})
        }
        }
        
        
            return (
                    <div className={styles.background}>

                        <Link to={""} onClickCapture={closeLogin}>Close</Link>
                        <Link to={""} onClickCapture={toggleView}>Already a member? Go to login ...</Link>
                        <form onSubmit={handleSubmit}>
                        <div>
                                <label htmlFor="email">Name</label>
                                <br/>
                                <input type="text" name="displayName" value={data.displayName} onChange={handleChange}/>
                                <br/>
                                <br/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <br/>
                                <input type="text" name="email" value={data.email} onChange={handleChange}/>
                                <br/>
                                <br/>
                            </div>
                            <div>
                                <label htmlFor="email">Password</label>
                                <br/>
                                <input type="password" name="password" value={data.password} onChange={handleChange}/>
                                <br/>
                                <br/>
                            </div>
                            {data.error ? <p>{data.error}</p> : null }
                            <input type="submit" style={{color: "red"}} value="Register" />
                        </form>
                    </div>
            )
    }

    return (
        showSignUp ? renderSignUp() : renderLogin()
    )
}
