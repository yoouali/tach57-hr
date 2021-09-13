import './styles/login.css';
import {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router";



function App() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    console.log(emailAddress, password)
    event.preventDefault();

    let item={emailAddress, password};
    let result = await fetch("https://stagiaire.herokuapp.com/api/login", {
      method: 'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))
    history.push("/add");
};

  return (
    <div className="App">
      <div className="container">
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin} method="POST" id="form">
          <div className="input-groupe">
            <input
            aria-label="Enter your Email"
            type="email"
            placeholder="Email Address"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
            />
          </div>
          <div className="input-groupe">
          <input
            aria-label="Enter your Password"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
