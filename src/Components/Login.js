import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
 
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Define user credentials
    const users = {
      "it@novonordics.com": {
        user_id: "U002",
        email: "it@novonordics.com",
        role: "IT",
        password: "Pass@1234",
      },
      "biomedical@novonordics.com": {
        user_id: "U001",
        email: "biomedical@novonordics.com",
        role: "Biomedical",
        password: "Pass@1234",
      },
    };
 
    // Check if the email exists in the users object
    const user = users[email];
    if (user && user.password === password) {
      // Store user details in localStorage
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: user.user_id,
          email: user.email,
          role: user.role,
        })
      );
 
      setError(""); // Clear any previous error
      onLogin(); // Notify parent component about login
      navigate("/"); // Redirect to the home page
    } else {
      // Set an error message for invalid credentials
      setError("Invalid email or password. Please try again.");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Ensure you have logo in public/novo-nordisk-logo.svg */}
        <img src="/logo.png" alt="Novo Nordisk" className="login-logo" />
        <h2>Procurement Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default Login;
 
 