import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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

//     axios.post("https://stagiaire.herokuapp.com/api/login",data)
//       .then(res => {
//         console.log(res)
//         localStorage.setItem('token', res.data.data.token);
//         history.push("/")
//       })
//       .catch(err => {
//         console.log(err)
//       })
  };

  const isLogged = localStorage.getItem('token');
  if (isLogged && isLogged !== undefined) {return (<Redirect to="/" />)}
  return(
    <div className="box">
      <div className="container">
        <div className="entrepreneur-form">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <p>Forget Password</p>
            <p id="FormError" className="FormError"></p>
            <div className="input-groupe">
              <input type="email" className="input" placeholder="" 
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}/>
              <label className="label"><span>Email Address</span></label>
            </div>
            <p id="ForgetPassword">Login</p>
            <button type="submit">submit</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword