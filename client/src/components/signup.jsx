import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import './component_style/signup.css';
import Axios from 'axios';

function Signup() {
  const [name, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
const[data,setdata]=useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      console.log("Please fill in all fields");
      return;
    }
    Axios.post("http://localhost:8080/auth/signup", { username:name, email, password })
      .then(response => { 
        setdata(response.data)
      
        setTimeout(() => {
        setdata(" ")
        }, 5000);
      
        setusername(""); 
        setemail("");
        setpassword("");
      })
      .catch(err => { 
        console.log(err);
      });
  };
  

  return (
    <>
      <h1>sign up page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input type="text" placeholder="Username" name="username" value={name} onChange={(e) => setusername(e.target.value)} />
          <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
          <input type="password" name="password" id="pass" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
          <input type="submit" value="Sign up" />
          <NavLink to="/login" activeClassName="active">already have account</NavLink>
        </div>
      </form>
    

      <h1>{data}</h1>
    </>
  );
}

export default Signup;
