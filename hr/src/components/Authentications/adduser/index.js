import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Header from "../../Header";
import SideBar from "../../SideBar";

import logo from "../../../images/logo.png";
import profileIcon from "../../../images/icons/person.png";
import entrepreneurIcon from "../../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../../images/icons/stagiaire.png";
import freelancerIcon from "../../../images/icons/freelancer.png";

function AddUser() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    CIN: "",
    TEL: "",
    Email: "",
    Role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

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

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      Prenom: formData.Prenom,
      Nom: formData.Nom,
      Email: formData.Email,
      CIN: formData.CIN,
      TEL: formData.TEL,
      Role: formData.Role,
      Token: token,
    };
    console.log(data);
    axios
      .post("https://stagiaire.herokuapp.com/api/addUser", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="box">
      <Header user={user} />
      <div className="homeContainer">
        <SideBar user={user} />
        <div className="dashborde">
          <div className="addUserForm">
            <form onSubmit={handleSubmit} id="perinfo">
              <div className="addUserFormTitle">
                <p>New Staff</p>
              </div>
              <div className="addUserFormInputs">
                <div className="addUserFormGroupeInput">
                  <label>Prenom</label>
                  <input
                    required
                    type="text"
                    name="Prenom"
                    onChange={(e) =>
                      setFormData({ ...formData, Prenom: e.target.value })
                    }
                    value={formData.Prenom}
                  ></input>
                </div>
                <div className="addUserFormGroupeInput">
                  <label>Nom</label>
                  <input
                    required
                    type="text"
                    name="Nom"
                    onChange={(e) =>
                      setFormData({ ...formData, Nom: e.target.value })
                    }
                    value={formData.Nom}
                  ></input>
                </div>
                <div className="addUserFormGroupeInput">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    name="Email"
                    onChange={(e) =>
                      setFormData({ ...formData, Email: e.target.value })
                    }
                    value={formData.Email}
                  ></input>
                </div>
                <div className="addUserFormGroupeInput">
                  <label>CIN</label>
                  <input
                    type="text"
                    name="CIN"
                    onChange={(e) =>
                      setFormData({ ...formData, CIN: e.target.value })
                    }
                    value={formData.CIN}
                  ></input>
                </div>
                <div className="addUserFormGroupeInput">
                  <label>TEL</label>
                  <input
                    type="text"
                    name="TEL"
                    onChange={(e) =>
                      setFormData({ ...formData, TEL: e.target.value })
                    }
                    value={formData.TEL}
                  ></input>
                </div>
                <div className="addUserFormGroupeInput">
                  <label required>Role</label>
                  <input
                    type="text"
                    name="Role"
                    onChange={(e) =>
                      setFormData({ ...formData, Role: e.target.value })
                    }
                    value={formData.Role}
                  ></input>
                </div>
              </div>
              <button className="adduserButton" type="submit">
                Save
              </button>
            </form>
          </div>
          <div className="addUserLoading">
            <svg
              id="addUserLogo"
              width="401"
              height="102"
              viewBox="0 0 401 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M326.028 97.1988V4.22266H344.141V41.502H380.887V4.22266H399V97.1988H380.887V58.3317H344.141V97.1988H326.028Z"
                stroke="#117DB0"
                strokeWidth="3"
              />
              <path
                d="M275.789 28.4195C272.124 24.8207 268.363 22.1956 264.505 20.5444C260.647 18.8509 256.519 18.0041 252.121 18.0041C243.094 18.0041 235.899 20.9678 230.536 26.8953C225.174 32.8227 222.493 40.7824 222.493 50.7744C222.493 60.5547 224.981 68.3238 229.958 74.0819C234.934 79.7977 241.724 82.6556 250.327 82.6556C255.227 82.6556 259.779 81.7664 263.984 79.9882C268.189 78.1676 272.086 75.4579 275.673 71.8591L275.558 92.2453C271.7 94.7433 267.649 96.6062 263.405 97.834C259.2 99.0619 254.764 99.6758 250.096 99.6758C236.593 99.6758 225.502 95.082 216.822 85.8945C208.18 76.6646 203.859 64.9579 203.859 50.7744C203.859 36.6332 208.199 24.9688 216.88 15.7813C225.56 6.59377 236.748 2 250.443 2C255.034 2 259.47 2.52924 263.753 3.58771C268.035 4.64618 272.259 6.27623 276.426 8.47785L275.789 28.4195Z"
                stroke="#117DB0"
                strokeWidth="3"
              />
              <path
                d="M40.8872 21.1159V97.1988H22.7167V21.1159H2V4.22266H61.7197V21.1159H40.8872Z"
                stroke="#117DB0"
                strokeWidth="3"
              />
              <path
                d="M106.483 97.1988V4.22266H156.365V20.9889H124.596V40.1049H156.365V56.9981H124.596V80.3056H156.365V97.1988H106.483Z"
                stroke="#117DB0"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
