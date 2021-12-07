import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/HOME";
import Login from "./components/Authentications/login";
import Setting from "./components/Setting";
import StagiaireList from "./components/StagiaireList";
import EntrepreneurList from "./components/EntrepreneurList";
import StagiaireComp from "./components/StagiareComp";
import EntrepreneurComp from "./components/EntrepreneurComp";
import UserComp from "./components/UserComp";
import UserList from "./components/UserList";
import EntrepreneurUpdate from "./components/entrepreneurUpdate.js";
import FreelancerList from "./components/FreelancerList";
import FreelancerComp from "./components/FreelancerComp";
import StagiaireUpdate from "./components/stagiaireUpdate";
import FreelancerUpdate from "./components/freelancerUpdate";
import ForgetPassword from "./components/Authentications/forgetPassword";
import AddUser from "./components/Authentications/adduser";
import ResetPassword from "./components/Authentications/resetPassword";
import CallCenter from "./pages/callCenter";
import Call from "./pages/callCenter/Call";
import Contact from "./pages/callCenter/Contact";
import ContactUpdate from "./pages/callCenter/Contact/update";
import CallUpdate from "./pages/callCenter/Call/update";

import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          {" "}
          <Home />
        </Route>
        <Route exact path="/login">
          {" "}
          <Login />
        </Route>
        <Route exact path="/setting">
          {" "}
          <Setting />
        </Route>
        <Route exact path="/Stagiairelist">
          {" "}
          <StagiaireList />
        </Route>
        <Route exact path="/Entrepreneurlist">
          {" "}
          <EntrepreneurList />
        </Route>
        <Route exact path="/Userlist">
          {" "}
          <UserList />
        </Route>
        <Route exact path="/FreelancerList">
          {" "}
          <FreelancerList />
        </Route>
        <Route exact path="/Stagiaire/:id">
          {" "}
          <StagiaireComp />
        </Route>
        <Route exact path="/Entrepreneur/:id">
          {" "}
          <EntrepreneurComp />
        </Route>
        <Route exact path="/user/:id">
          {" "}
          <UserComp />
        </Route>
        <Route exact path="/freelancer/:id">
          {" "}
          <FreelancerComp />
        </Route>
        <Route exact path="/Entrepreneurupdate/:id">
          {" "}
          <EntrepreneurUpdate />
        </Route>
        <Route exact path="/Stagiaireupdate/:id">
          {" "}
          <StagiaireUpdate />
        </Route>
        <Route exact path="/FreelancerUpdate/:id">
          {" "}
          <FreelancerUpdate />
        </Route>
        <Route exact path="/ForgetPassword">
          {" "}
          <ForgetPassword />
        </Route>
        <Route exact path="/AddUser">
          {" "}
          <AddUser />
        </Route>
        <Route exact path="/ResetPassword/:id">
          {" "}
          <ResetPassword />
        </Route>
        <Route exact path="/CallCenterList">
          {" "}
          <CallCenter />{" "}
        </Route>
        <Route exact path="/Call/:id">
          {" "}
          <Call />{" "}
        </Route>
        <Route exact path="/Contact/:id">
          {" "}
          <Contact />{" "}
        </Route>
        <Route exact path="/ContactUpdate/:id">
          {" "}
          <ContactUpdate />{" "}
        </Route>
        <Route exact path="/CallUpdate/:id">
          {" "}
          <CallUpdate />{" "}
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
