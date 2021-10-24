import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Redirect  } from "react-router";
import axios from 'axios';
import './style.css';



function Login(){
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      Email: emailAddress,
      Password: password
    }
    axios.post("https://stagiaire.herokuapp.com/api/login",data)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.data.token);
        history.push("/")
      })
      .catch(err => {
        console.log(err)
        document.getElementById("FormError").innerText="Email or Password Incorect";
        setTimeout(function(){document.getElementById("FormError").innerText="";}, 2000)
      })
  };

  const isLogged = localStorage.getItem('token');
  if (isLogged && isLogged !== undefined) {return (<Redirect to="/" />)}
  return(
    <div className="box">
      <div className="container">
        <div className="entrepreneur-form">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <p>Login</p>
            <p id="FormError" className="FormError"></p>
            <div className="input-groupe">
              <input required type="email" className="input" placeholder="" 
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}/>
              <label className="label"><span>Email Address</span></label>
            </div>
            <div className="input-groupe">
              <input required type="password" className="input" placeholder=""
              onChange={({ target }) => setPassword(target.value)}
              value={password}/>
              <label className="label"><span>Password</span></label>
            </div>
            <Link style={{ textDecoration: 'none' }} to="/ForgetPassword"><p id="ForgetPassword">Forget password?</p></Link>
            <button type="submit">submit</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login