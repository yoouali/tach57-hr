import {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router";
import Header from './Comp/Header';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Comp/login.js';
import Home from './Comp/home.js';


function App() {
  return(
    <div className="App">
      <BrowserRouter>
      <h1>Tech-57 Project</h1>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
