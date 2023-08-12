import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css"
import { AuthContext } from "../Context/AuthContext";
import axios from "axios"

export const Login = () => {
  const navigate = useNavigate("");
  const [credentials, setCredentials] = useState({username: undefined,password: undefined});
  const {  loading, error,dispatch } = useContext(AuthContext);
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const clickHandler =async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3500/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate("/")     
    } catch (err){
      dispatch({ type: "LOGIN_FAILD", payload: err.response.data });
    }
  }

  return (
    <div className="cardWrapper">
      <div className="card">
        <div className="cardBody">
          <h2>Login</h2>
          <form>
            <div className="username">
              <label htmlFor="username">UserName:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                required
                placeholder="password"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              ></input>
            </div>
            {/* <Link to="/"> */}
            <button disabled={loading} type="submit" onClick={clickHandler}>
              Login
            </button>
            {/* </Link> */}
          </form>
          {error && <span>{error.message}</span>}
          <div className="text-center w-100 mt-2">
            Need An Acount!{" "}
            <Link to="/signup" style={{ color: "rgb(45, 64, 188)" }}>
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
