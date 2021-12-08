import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Header";
import SideBar from "../SideBar";
import "./style.css";

import logo from "../../images/logo.png";
import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";
function UserComp() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [userComp, setUserComp] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/user/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setUserComp(res.data);
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

  const history = useHistory();
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

  if (!isLoading && !isLoading2 && userComp) {
    var userBox = null;
    var userStatus = null;
    var remove = null;
    if (userComp.id !== user.id)
      remove = (
        <div className="stageButton">
          <button onClick={userRemove} id="stageButtonRemove">
            Remove
          </button>
        </div>
      );
    if (userComp.Active === 1) {
      userBox = (
        <div id="userStatusBox" className="userBoxActive">
          <p> {userComp.Role} </p>
          <p id="userStatusSymbole"> &#10003;</p>
        </div>
      );
      userStatus = (
        <div className="stageButton">
          <button id="userStatusButton" value={0} onClick={userStatusChange}>
            d'active
          </button>
        </div>
      );
    } else {
      userBox = (
        <div id="userStatusBox" className="userBoxDeactive">
          <p> {userComp.Role} </p>
          <p id="userStatusSymbole"> &#10007;</p>
        </div>
      );
      userStatus = (
        <div className="stageButton">
          <button id="userStatusButton" value={1} onClick={userStatusChange}>
            active
          </button>
        </div>
      );
    }
  }

  function userRemove() {
    console.log("hh");
    Swal.fire({
      title: "Submit your Github username",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        const data = { Password: password };
        const token = localStorage.getItem("token");
        return axios
          .post(
            "https://stagiaire.herokuapp.com/api/user/delete/" + userComp.id,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            if (res.data !== "Ce utilisateur a ete supprimer avec succes") {
              throw new Error(res.data);
            }
            return res.data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: result.value,
        }).then((result) => {
          history.push("/Userlist");
        });
      }
    });
  }
  function userStatusChange(e) {
    console.log(e.target.value);
    const data = { Active: e.target.value };
    const token = localStorage.getItem("token");
    axios
      .post("https://stagiaire.herokuapp.com/api/user/active/" + id, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (e.target.value === "0") {
          console.log(e.target.value, "inside the res");
          document.getElementById("userStatusBox").style.backgroundColor =
            "#6A7C92";
          document.getElementById("userStatusSymbole").innerText = "✗";
          document.getElementById("userStatusButton").innerText = "active";
          document.getElementById("userStatusButton").value = 1;
        } else if (e.target.value === "1") {
          console.log(e.target.value, "inside the res");
          document.getElementById("userStatusBox").style.backgroundColor =
            "#11B03E";
          document.getElementById("userStatusSymbole").innerText = "✓";
          document.getElementById("userStatusButton").innerText = "d'active";
          document.getElementById("userStatusButton").value = 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }

  if (isLoading || isLoading2) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="box">
      <Header user={user} />
      <div className="homeContainer">
        <SideBar user={user} />
        <div className="dashborde">
          <div className="stageBar">
            <div className="stageTitle">
              {userComp.Nom} {userComp.Prenom}
            </div>
            <div className="stageInfo">
              <div className="leftInfo">
                {userBox}
                {userStatus}
                {remove}
              </div>
              <div className="rightInfo">
                <div className="perInfo">
                  <div className="perInfoTitle">
                    <p>
                      Perssonelle Information <span>&#128396;</span>
                    </p>
                    <hr id="epi"></hr>
                  </div>
                  <div className="perInfoData">
                    <div className="groupeInfo">
                      <div className="infoTitle">Prenom</div>
                      <div className="infoValue">{userComp.Prenom}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">Nom</div>
                      <div className="infoValue">{userComp.Nom}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">Email</div>
                      <div className="infoValue">{userComp.Email}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">TEL</div>
                      <div className="infoValue">{userComp.TEL}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">CIN</div>
                      <div className="infoValue">{userComp.CIN}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComp;
