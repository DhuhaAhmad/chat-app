function SignUp() {
    return ( <>

    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat App</span>
            <span className="title">Sign Up</span>
            <form>
                <input type="text" placeholder="dispaly name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor="file">
                <img src="https://img.icons8.com/color/100/null/add-image.png"
                />
                <span>Add avatar</span>
                

                </label>

                <button>Sign up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>

    </> );
}

export default SignUp;