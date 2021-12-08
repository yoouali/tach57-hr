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
function UserList() {
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [userList, setUserList] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://stagiaire.herokuapp.com/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setUserList(res.data);
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
  if (!isLoading && !isLoading2 && userList) {
    console.log(userList);
    var nameList = userList.map(function (name) {
      var userStatus = <div className="userTableStatus">active✓</div>;
      if (name.Active === 0)
        userStatus = <div className="userTableStatus">deactive✗</div>;
      console.log(name, "hh");
      if (name.Role === "admin" && name.Active === 1) {
        return (
          <Link
            key={name.id}
            style={{ textDecoration: "none" }}
            to={"/user/" + name.id}
          >
            {" "}
            <div key={name.id} id="userTableAdmin" className="userTable">
              <div className="userTableRole">ADMIN</div>
              <div className="userTableName">
                <p id="userTableNameAdmin">
                  {name.Nom} {name.Prenom}
                </p>
              </div>
              {userStatus}
            </div>
          </Link>
        );
      }
      if (name.Role === "rh" && name.Active === 1) {
        return (
          <Link
            key={name.id}
            style={{ textDecoration: "none" }}
            to={"/user/" + name.id}
          >
            {" "}
            <div key={name.id} id="userTableRh" className="userTable">
              <div className="userTableRole">RH</div>
              <div className="userTableName">
                <p id="userTableNameRh">
                  {name.Nom} {name.Prenom}
                </p>
              </div>
              {userStatus}
            </div>
          </Link>
        );
      }
      if (name.Active === 0) {
        console.log("hadi");
        return (
          <Link
            key={name.id}
            style={{ textDecoration: "none" }}
            to={"/user/" + name.id}
          >
            {" "}
            <div key={name.id} id="userTableda" className="userTable">
              <div className="userTableRole">{name.Role}</div>
              <div className="userTableName">
                <p id="userTableNameda">
                  {name.Nom} {name.Prenom}
                </p>
              </div>
              {userStatus}
            </div>
          </Link>
        );
      }
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
                <form className="serchBar">
                  <div className="serchInput">
                    <input
                      type="text"
                      placeholder="serch"
                      className="Serch"
                      // onChange={({ target }) => setSerch(target.value)}
                    />
                  </div>
                  <button className="serchButton">Serch</button>
                </form>
              </div>
              <div className="Filter">
                <div className="filterTitle">Filters : </div>
                <div className="filterOptions">
                  <div id="filterAdmin">admin</div>
                  <div id="filterRh">rh</div>
                </div>
              </div>
            </div>
            <div className="userList">{nameList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
