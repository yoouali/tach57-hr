import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Redirect, useParams  } from "react-router";
import axios from 'axios';
import './style.css';



function ResetPassword(){
    const {id} = useParams();
  const history = useHistory();
  const [Password, setPassword] = useState('');
  const [Passwordc, setPasswordC] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      Password: Password,
      Token: id,
    }
    axios.post("https://stagiaire.herokuapp.com/api/resetPass",data)
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
            <p>Reset Password</p>
            <p id="FormError" className="FormError"></p>
            <div className="input-groupe">
              <input type="password" className="input" placeholder="" 
              onChange={({ target }) => setPassword(target.value)}
              value={Password}/>
              <label className="label"><span>New Password</span></label>
            </div>
            <div className="input-groupe">
              <input type="password" className="input" placeholder="" 
              onChange={({ target }) => setPasswordC(target.value)}
              value={Passwordc}/>
              <label className="label"><span>Confirme New Password</span></label>
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

export default ResetPassword