import React, { useState } from 'react';
import { Redirect  } from "react-router";
import axios from 'axios';
import './style.css';



function Login(){

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: emailAddress,
      password: password
    }

    axios.post("https://stagiaire.herokuapp.com/api/login",data)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token);
        return (
          <Redirect to="/login" />
        )
      })
      .catch(err => {
        console.log(err)
      })
  };

  return(
    <div>
      <div className="container">
        <div className="entrepreneur-form">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <p>Login</p>
            <div className="input-groupe">
              <input type="email" className="input" placeholder="" 
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}/>
              <label className="label"><span>Email Address</span></label>
            </div>
            <div className="input-groupe">
              <input type="password" className="input" placeholder=""
              onChange={({ target }) => setPassword(target.value)}
              value={password}/>
              <label className="label"><span>Password</span></label>
            </div>
            <p id="FormError" className="FormError"></p>
            <button type="submit">submit</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login