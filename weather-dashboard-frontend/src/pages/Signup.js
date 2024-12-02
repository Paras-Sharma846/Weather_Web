import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      });
      if(response.statusCode === 201) {
        const { token, message } = response.data;
  
        // Save token to localStorage for persistence
        localStorage.setItem("token", token);
  
        alert(message || "resgister successful!");
        navigate("/"); // Redirect to Dashboard
      } else {
        alert(response.data.message || "Signup Failed");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
};

export default Signup;
