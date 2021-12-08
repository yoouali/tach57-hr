import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./style.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";

import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";

function FreelancerList() {
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [freelancerList, setFreelancerList] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://stagiaire.herokuapp.com/api/freelancer", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFreelancerList(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://stagiaire.herokuapp.com/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handelUserNav() {
    let element = document.getElementById("userNav");
    if (element.style.display === "none") element.style.display = "block";
    else element.style.display = "none";
  }
  document.addEventListener("click", function (evt) {
    let flyoutEl = document.getElementById("user"),
      targetEl = evt.target; // clicked element
    do {
      if (targetEl === flyoutEl) {
        // This is a click inside, does nothing, just return.
        console.log("click inside");
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside.
    if (
      document.getElementById("userNav") &&
      document.getElementById("userNav").style.display === "block"
    )
      document.getElementById("userNav").style.display = "none";
  });

  if (freelancerList !== undefined) {
    var namelist = freelancerList.map(function (name) {
      return (
        <div key={name.id} className="item">
          <div className="itemTitle">
            <p>{name.Sujet}</p>
          </div>
          <div className="itemOwner">
            <p>{name.Nom}</p>
            <p>{name.Prenom}</p>
          </div>
          <div className="itemDate">
            <p>25-08-2021</p>
            <p>25-02-2021</p>
          </div>
          {/* <p className="itemProp">spactate</p> */}
          <Link to={"/freelancer/" + name.id}>
            {" "}
            <p className="itemProp">spactate</p>
          </Link>
        </div>
      );
    });
  }

  const [serch, setSerch] = useState();
  function handleSerch(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (serch === undefined || serch === "") return;
    axios
      .get("https://stagiaire.herokuapp.com/api/freelancer/" + serch, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFreelancerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (isLoading || isLoading2) {
    return <div className="App">Loading...</div>;
  }
  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="box">
      <Header user={user} />
      <div className="homeContainer">
        <SideBar user={user} />
        <div className="dashborde">
          <div className="list">
            <div className="listHeader">
              <div>
                <form className="serchBar" onSubmit={handleSerch}>
                  <div className="serchInput">
                    <input
                      type="text"
                      placeholder="serch"
                      className="Serch"
                      onChange={({ target }) => setSerch(target.value)}
                    />
                  </div>
                  <button className="serchButton">Serch</button>
                </form>
              </div>
              <div className="Filter">
                <div className="filterTitle">Filters : </div>
                <div className="filterOptions">
                  <p>New</p>
                  <p>Fineshd</p>
                  <p>On progrese</p>
                </div>
              </div>
            </div>
            {namelist}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerList;
