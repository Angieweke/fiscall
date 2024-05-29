function Header({user, profileURL}) {
    return (
        <div className="profile">
            {profileURL && <img src={profileURL} alt="Profile" />}
            
            <p>{user}</p>
        </div>
    )
}

export default Header
