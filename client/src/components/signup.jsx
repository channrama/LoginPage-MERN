import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './component_style/signup.css'; // Import your CSS file for styling
import Axios from 'axios';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setData("Please fill in all fields");
      setTimeout(() => {
        setData("");
      }, 3000);
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await Axios.post("http://localhost:8080/auth/signup", { username: name, email, password });
      setData(response.data);
      setTimeout(() => {
        setData("");
      }, 5000);
      
      setName(""); 
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Username" name="username" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <input type="password" name="password" id="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>Sign up</button>
        <NavLink to="/login" activeClassName="active" className="login-link">Already have an account? Login</NavLink>
      </form>

      {data && <div className="success-message">{data}</div>}
    </div>
  );
}

export default Signup;
