import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './component_style/login.css';
import Axios from 'axios';

function Login() {
  const [name, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [data,setdata]=useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      console.log("Please fill in all fields");
      return;
    }
    Axios.post("http://localhost:8080/auth/login", { username: name, password })
      .then(response => { 
        setdata(response.data)
        setTimeout(() => {
          setdata("")
        }, 5000);
        setusername(""); 
        setpassword("");
      })
      .catch(err => { 
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input type="text" placeholder="Username" name="username" value={name} onChange={(e) => setusername(e.target.value)} className="form-input" />
          <input type="password" name="password" id="pass" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-input" />
          <input type="submit" value="Login" className="submit-button" />
          <p className="error-message">{data}</p>
          <NavLink to="/signup" activeClassName="active" className="signup-link">Create an account</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
