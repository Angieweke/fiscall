import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const navigate =useNavigate()
    
    const login = (e)=>{
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        navigate("/")
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        });
    }


    return (
        <div className="main">
            <form className="inner" onSubmit={login}>
                <h1>Fiscal LLC</h1>
                <h2>Login Page</h2>
            
                <input ref={emailRef} type="email" placeholder="Enter your email address" />
                <input ref={passwordRef} type="password" placeholder="Enter your password"/>
                <button>Login</button>
                <p>Dont have an Account? <Link to="/register" >Create Account.</Link></p>
                <p>Reset password?</p>
            </form>
        </div>
    )
}

export default Login
