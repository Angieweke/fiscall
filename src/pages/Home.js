import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signOut } from "firebase/auth"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { app } from "../firebase"
import { useEffect, useState } from "react"
import Header from "../components/header"

function Home({profileURL, setProfileURL}) {
    const auth = getAuth() //confirm that the user has logged in
    const db = getFirestore(app) //access firestore database
    const navigate = useNavigate() // navigating from one page to another
    const [user, setUser] = useState('')
    // const [profile, setProfile] = useState('')
    // const [profilePic, setProfilePic] = useState('')
    useEffect(()=>{ //DOM manipulation
        onAuthStateChanged(auth,(user)=>{ // only authenticated users can acces the homePage
            if(user === null){ //If user is npt logged in it returns the user to the login page
                // navigate("/login")
                setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    navigate('/login')
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

                
            }
            else{
                const fetchUser = async ()=>{
                    const queryDocument = query(  //filter data based on a the user who has logged in
                        collection(db, "Users"),
                        where("userID","==", user.uid)
                    )
                    const querySnapshot = await getDocs(queryDocument)
                    querySnapshot.forEach((userDoc)=>{
                        const username =userDoc.data().userName
                        const profile = userDoc.data().profileImage
                        console.log(username)
                        setUser(username)
                        setProfileURL(profile)
                    })
                }
                fetchUser()
            }
        })
    }, [auth, db])
    const signout = ()=>{ //user akilog out inampeleka kwa login page
        signOut(auth).then(()=>{
            navigate("/login")
        })
    }

    return (

        <div className="home" >
            
            <Sidebar signout={signout}/>    {/* assigning prop values to the side bar passing data from parent component to child component */}
            <main >
            <Header user={user} profileURL={profileURL} />
            <Outlet/>
            </main>
        </div>
    )
}

export default Home
