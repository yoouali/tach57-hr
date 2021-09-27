import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/HOME';
import Login from './components/Authentications/login';
import Setting from './components/Setting';
import './style.css';


function App() {
  return(
    <div className="App">
      <BrowserRouter>
      <Route exact path="/"> <Home /></Route>
      <Route exact path="/login"> <Login /></Route>
      <Route exact path="/setting"> <Setting /></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
