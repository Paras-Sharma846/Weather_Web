import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
  
      if (response.status === 200) { // Check for a successful status
        const { token, message } = response.data;
  
        // Save token to localStorage for persistence
        localStorage.setItem("token", token);
  
        alert(message || "Login successful!");
        navigate("/"); // Redirect to Dashboard
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Login failed. Please try again.");
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="link">Don't have an account? Signup</Link>
    </div>
  );
};

export default Login;
