import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";

import "./style.css";

import logo from "../../images/logo.png";
import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";

function Setting() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    CIN: "",
    TEL: "",
    Email: "",
    Role: "",
    Password: "",
  });
  const [changePassword, setChangePassword] = useState({
    oldPass: "",
    newPass: "",
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

  function changePasswordSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://stagiaire.herokuapp.com/api/user/changePassword",
        changePassword,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        console.log("hh");
        if (res.data === "Mot de passe n'est pas correcte")
          console.log("error");
        else history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handelSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post("https://stagiaire.herokuapp.com/api/user/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log("hh");
        if (res.data === "Mot de passe n'est pas correcte")
          console.log("error");
        else history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading) {
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
          <div className="updateUserBox">
            <div className="updateUserLeftBar">
              <div className="updateUserLeftBarTitle">Profile Management</div>
              <hr></hr>
              <div
                className="updateUserLeftBarSection"
                onClick={function () {
                  document.getElementById("passwordChange").style.display =
                    "none";
                  document.getElementById("perinfo").style.display = "block";
                }}
              >
                <p className="updateUserLeftBarSectionChose">Information</p>
              </div>
              <div
                className="updateUserLeftBarSection"
                onClick={function () {
                  document.getElementById("passwordChange").style.display =
                    "block";
                  document.getElementById("perinfo").style.display = "none";
                }}
              >
                Password
              </div>
            </div>
            <div className="updateUserRightBar">
              <form onSubmit={handelSubmit} id="perinfo">
                <div className="entrepreneurUpdateSectionTitle">
                  <p> Personnelles Information</p>
                </div>
                <div className="updateUserFormSection">
                  <div className="updateUserInputGroupe">
                    <label>Prenom</label>
                    <input
                      type="text"
                      name="Prenom"
                      placeholder={user.Prenom}
                      onChange={(e) =>
                        setFormData({ ...formData, Prenom: e.target.value })
                      }
                      value={formData.Prenom}
                    ></input>{" "}
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="Nom"
                      placeholder={user.Nom}
                      onChange={(e) =>
                        setFormData({ ...formData, Nom: e.target.value })
                      }
                      value={formData.Nom}
                    ></input>{" "}
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>CIN</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={user.CIN}
                      onChange={(e) =>
                        setFormData({ ...formData, CIN: e.target.value })
                      }
                      value={formData.CIN}
                    ></input>
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>TEL</label>
                    <input
                      type="text"
                      name="TEL"
                      placeholder={user.TEL}
                      onChange={(e) =>
                        setFormData({ ...formData, TEL: e.target.value })
                      }
                      value={formData.TEL}
                    ></input>
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>Email</label>
                    <input
                      type="text"
                      name="Email"
                      placeholder={user.Email}
                      onChange={(e) =>
                        setFormData({ ...formData, Email: e.target.value })
                      }
                      // if(e.target.value == ""){document.getElementById("formDataPassword").style.display="none"}
                      // else{document.getElementById("formDataPassword").style.display="flex"}}}
                      value={formData.Email}
                    ></input>{" "}
                  </div>
                  <div id="formDataPassword" className="updateUserInputGroupe">
                    <label>Password</label>
                    <input
                      type="password"
                      name="Password"
                      placeholder="***********"
                      onChange={(e) =>
                        setFormData({ ...formData, Password: e.target.value })
                      }
                      value={formData.Password}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateFormButoon">
                    <button type="submit">Save</button>
                    <Link to={"/"}>
                      {" "}
                      <button>Cancel</button>
                    </Link>
                  </div>
                </div>
              </form>
              <form onSubmit={changePasswordSubmit} id="passwordChange">
                <div className="entrepreneurUpdateSectionTitle">
                  <p>Password Change</p>
                </div>
                <div className="updateUserFormSection">
                  <div className="updateUserInputGroupe">
                    <label>Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder=""
                      onChange={(e) =>
                        setChangePassword({
                          ...changePassword,
                          oldPass: e.target.value,
                        })
                      }
                      value={changePassword.oldPass}
                    ></input>
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder=""
                      onChange={(e) =>
                        setChangePassword({
                          ...changePassword,
                          newPass: e.target.value,
                        })
                      }
                      value={changePassword.newPass}
                    ></input>
                  </div>
                  <div className="updateUserInputGroupe">
                    <label>New Password Confermation</label>
                    <input
                      type="password"
                      name="newPasswordC"
                      placeholder=""
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateFormButoon">
                    <button type="submit">Save</button>
                    <Link to={"/"}>
                      {" "}
                      <button>Cancel</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
