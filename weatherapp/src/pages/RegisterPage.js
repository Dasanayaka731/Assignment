import React, { useState } from "react";
import "../style/RegisterStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userHandle = async () => {
    try {
      if (password !== confirmPassword) {
        console.log("Password Not Match");
      }
      await axios.post(`http://localhost:8000/user/add`, {
        email: email,
        password: password,
      });
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div className="txt-login">
          <h1>Register</h1>
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
        <div>
          <label htmlFor="re-password">Re-Password</label>
          <br />
          <input
            id="re-password"
            type="password"
            placeholder="re-enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={userHandle}>Register</button>
        </div>
        <div className="text">
          <p>
            Already you have an account?{" "}
            <b>
              <Link to={"/"}>Login</Link>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}
