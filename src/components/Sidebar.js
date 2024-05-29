import { Link } from "react-router-dom";

function Sidebar({signout}) {
  return (
    // <div className="parent">
      
    <div className="side">
      <h1>Fiscall LLC</h1>

      <div className="children">
        <Link to="/">Dashboard</Link>
        <Link to="income">Income</Link>
        <Link to="expenses">Expenses</Link>
        <Link to="profile">Profile</Link>
      </div>
      <button onClick={signout} className="btn">Log Out</button>
    </div>
    // </div>
  );
}

export default Sidebar;
