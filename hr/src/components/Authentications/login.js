import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch('https://stagiaire.herokuapp.com/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [value, setValue] = useState('');
  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    // alert('A form was submitted: ' + event);
    console.log(event.target);
    fetch('https://stagiaire.herokuapp.com/api/login', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(event.target)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onChange={} onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="email" name="email" id="email"value={value} onChange={handleChange} />
        </label>
        <label>
          <p>Password</p>
          <input name="password" id="password" type="password"value={value} onChange={handleChange} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};