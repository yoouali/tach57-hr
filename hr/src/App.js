import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/HOME';
import Login from './components/Authentications/login';
import './style.css';


function App() {
  return(
    <div className="App">
      <BrowserRouter>
      <Route exact path="/"> <Home /></Route>
      <Route exact path="/login"> <Login /></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
