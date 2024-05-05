import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './component_style/signup.css';
import Axios from 'axios';

function Login() {
  const [name, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name ||  !password) {
      console.log("Please fill in all fields");
      return;
    }
    Axios.post("http://localhost:8080/auth/login", {  username:name, password })
      .then(response => { 
        setdata(response.data)

      
        setusername(""); 
        setpassword("");
      })
      .catch(err => { 
        console.log(err);
      });
  };
  

  return (
    <>
      <h1>Login</h1>
      <form >
        <div className="form">
          <input type="text" placeholder="Username" name="username" value={name} onChange={(e) => setusername(e.target.value)} />
          <input type="password" name="password" id="pass" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
          <input type="submit" value="Login" />
          <NavLink to="/signup" activeClassName="active">create account</NavLink>
        </div>
      </form>
    

    </>
  );
}

export default Login;
