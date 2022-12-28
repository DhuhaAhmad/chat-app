function LogIn() {
    return (  <>
       <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat App</span>
            <span className="title">Log In</span>
            <form>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Log In</button>
            </form>
            <p>You don't have an account? Sign up</p>
        </div>
    </div>
    </>);
}

export default LogIn;