import React, { useState } from "react";
import "../style/LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/home");
    } catch (err) {
      console.log(err.response.status);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div className="txt-login">
          <h1>Login</h1>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="text"
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="text">
          <p>
            You don't have an account?{" "}
            <b>
              <Link to={"/register"}>Register</Link>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}
