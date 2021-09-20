import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/HOME';


function App() {
  return(
    <div className="App">
      <BrowserRouter>
      <Route path="/"> <Home /> </Route>
      <Route path="/login"> <Login /> </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
