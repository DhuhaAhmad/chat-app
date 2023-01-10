import {signInWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {useState} from "react"


function LogIn() {

    const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
 

    try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
        
    
    } catch (error) {
      setErr(true);
    }
  };
    return (  <>
       <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat App</span>
            <span className="title">Log In</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Log In</button>
                {err && <span>Somthing went wrong</span>}

            </form>
            <p>You don't have an account? <Link to={"/signup"}>Sign up</Link> </p>
        </div>
    </div>
    </>);
}

export default LogIn;