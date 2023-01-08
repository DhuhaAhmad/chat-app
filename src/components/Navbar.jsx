import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
    return ( <>
    <div className="navbar">
        <span className="logo">Chat App</span>
        <div className="user">
        <img src="https://img.icons8.com/doodle/100/null/user-female-red-hair.png"/>
            <span>Dhuha</span>
            <button onClick={()=> signOut(auth)}>logout</button>
        </div>
    </div>
    
    </> );
}

export default Navbar;