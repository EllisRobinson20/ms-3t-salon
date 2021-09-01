import React, {useContext} from 'react'
import { NavigationContext } from "../context/NavigationContext";

export default function Blog({location}) {
    const {setPageState} = useContext(NavigationContext);
    setPageState(location.pathname);
    return (
        <div>
            
        </div>
    )
}
