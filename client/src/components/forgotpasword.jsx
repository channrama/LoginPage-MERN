import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './component_style/login.css';
import Axios from 'axios';

function Email() {
  const [mail, setMail] = useState(""); 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    Axios.post("http://localhost:8080/auth/email", { email: mail }) 
      .then(response => {
        if (response.data.status)
          alert("Message has been sent");
        else
          alert("Error");
      })
      .catch(err => { 
        console.log(err);
      });
      setMail(" ")
  };

  return (
    <div className="login-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" onChange={(e) => setMail(e.target.value)} /> 
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Email;
