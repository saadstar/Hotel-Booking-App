import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export const NavBar = () => {
  const { user ,dispatch} = useContext(AuthContext);
  const navigate=useNavigate("")

  const logoutHandler =async (e) => {
    e.preventDefault();
    try {
       dispatch({ type: "LOGOUT" });
       localStorage.removeItem("user");
       navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <span className="logo">
            {user ? `${user.username} Booking` : "Saad Booking"}
          </span>
        </Link>
        {!user ? (
          <div className="navbar-items">
            <Link to="/signup">
              <button className="navbar-button">Register</button>
            </Link>
            <Link to="/login">
              <button className="navbar-button" type="submit">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <button className="navbar-button" onClick={logoutHandler}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
