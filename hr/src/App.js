import { useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/HOME';
import Login from './components/Authentications/login';



function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return(
    <div className="App">
      <BrowserRouter>
      <Route exact path="/"> <Home /></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
