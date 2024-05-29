import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

    function Profile({setProfileURL}) {
    const [profile, setProfile] = useState(null);
    // const [profileURL, setProfileURL] = useState("");
    //profile stores the selected file.
    //profileURL stores the URL of the uploaded file.

    function handleUpload(e) {
        e.preventDefault();
        if (!profile) {
        console.log("No file selected.");
        return;
        }

        //handleUpload uploads the file to Firebase Storage.

    const storage = getStorage(app);
    const profileRef = ref(storage, `profiles/${profile.name}`);// to create a reference to specify where the file will be stored.
//ref is used to create a specific path (profiles/${profile.name}) where the file will be stored.
//profile.name It ensures that each file is uploaded to a path that includes its name, making it easy to organize and retrieve files.      
        uploadBytes(profileRef, profile)
        .then((snapshot) => {
            alert("Uploaded a blob or file!", snapshot);
            return getDownloadURL(profileRef);
        })//use the reference to upload the file to the specified location.
        //This path helps in organizing and later accessing the uploaded file.
        .then((url) => {
            setProfileURL(url);
            console.log("File available at", url);
        })
        .catch((error) => {
            console.error("Error uploading file:", error);
        });
    }

    return (
        <div>
            {/* The form's onSubmit event triggers handleUpload. */}
        <Form onSubmit={handleUpload}>  
            <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
            {/* The input element's onChange event updates the profile state with the selected file. */}
            <button type="submit">Upload</button>
            
        </Form>
        {/* {profileURL && <img src={profileURL} alt="Profile" />} */}
            
            {/*  After uploading, the file's URL is fetched and stored in profileURL.
            The image is displayed using the img tag if profileURL is available.
            It means "Render the img element only if profileURL has a value." */}
         
        </div>
    );
}

export default Profile;
