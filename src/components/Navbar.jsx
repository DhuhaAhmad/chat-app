import { signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../firebase";
import {AuthContext} from '../context/AuthContext'

function Navbar() {

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser.dispalyName);
    return ( <>
    <div className="navbar">
        <span className="logo">Chat App</span>
        <div className="user">
        <img src={currentUser.photoURL}/>
            <span>{currentUser.displayName}</span>
            <button onClick={()=> signOut(auth)}>logout</button>
        </div>
    </div>
    
    </> );
}

export default Navbar;