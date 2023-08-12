import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./auth.css"
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';


export const Sign = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const { loading, dispatch } = useContext(AuthContext);
  
  const registerHandler = async (e) => {   
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3500/api/auth/register", {
        username,email,password,admin
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
      setUsername("");
      setEmail("");
      setPassword("");
      setAdmin(false)
    } catch (err) {
      console.log(err);
  }
  };


  return (
    <div className="cardWrapper">
      <div className="card">
        <div className="cardBody">
          <h2>Sign Up</h2>
          <form>
            <div className="username">
              <label htmlFor="username">UserName:</label>
              <input
                type="username"
                ref={usernameRef}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                placeholder="UserName"
                required
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                ref={emailRef}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="@gmail.com"
                required
              ></input>
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                required
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
                ref={passwordRef}
              ></input>
            </div>
            <div className="admin">
              <input
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onClick={() => setAdmin(!admin)}
              />
              <label htmlFor="flexCheckDefault">Admin</label>
            </div>
            <button type="submit" onClick={registerHandler} disabled={loading}>
              Sign Up
            </button>
          </form>
          <div className="acount">
            Already have an acount!{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
