import { collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { app } from "../firebase"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()

    const navigate =useNavigate()
    const db = getFirestore(app)

    const handleSubmit = (e)=>{
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const name = nameRef.current.value

        const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password, name)

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    // navigate("/")
    const newUser = doc(collection(db, "Users"))
    setDoc(newUser, {
      userID: user.uid,
      userName: name,
      userEmail: email,
      profileImage: "https://firebasestorage.googleapis.com/v0/b/fiscal-81b99.appspot.com/o/profile-pic.jpg?alt=media&token=53db10f0-255a-4fa7-8ff3-c88a2c9efd98"

    }).then(()=>{
      navigate('/')
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }

    return (
        <div className="main">
            <form className="inner" onSubmit={handleSubmit}>
                <h1>Fiscal LLC</h1>
                <h2>Create Account</h2>
                <input ref={nameRef} type="text"  placeholder="Enter your full name"/>
                <input ref={emailRef} type="email" placeholder="Enter your email address" />
                <input ref={passwordRef} type="password" placeholder="Set your password"/>
                <button>Create Account</button>
                <p>Already a user? <Link to="/login" >Sign in.</Link></p>
            </form>
        </div>
    )
}

export default Register
