import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Redirect  } from "react-router";
import axios from 'axios';
import './style.css';



function ForgetPassword(){
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      Email: emailAddress,
    }
    document.getElementById("forgetPasswordEmail").style.display="block";
    document.getElementById("forgetPasswordForm").style.display="none";

    axios.post("https://stagiaire.herokuapp.com/api/forgetPass",data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const isLogged = localStorage.getItem('token');
  if (isLogged && isLogged !== undefined) {return (<Redirect to="/" />)}
  return(
    <div className="box">
      <div className="container">
        <div className="entrepreneur-form">
        <form id="forgetPasswordForm" onSubmit={handleSubmit}>
          <div className="form">
            <p>Forget Password</p>
            <p id="FormError" className="FormError"></p>
            <div className="input-groupe">
              <input type="email" className="input" placeholder="" 
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}/>
              <label className="label"><span>Email Address</span></label>
            </div>
            <Link style={{ textDecoration: 'none' }} to="/login"> <p id="ForgetPassword">Login</p> </Link>
            <button type="submit">submit</button>
          </div>
        </form>
        <div id="forgetPasswordEmail">
            <p>If your email exist we wel send a lnik to restore </p><p>your password in your email</p>
            <br></br>
            <hr></hr>
            <Link style={{ textDecoration: 'none' }} to="/login"> <p className="forgetPasswordLogin">Login</p> </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword