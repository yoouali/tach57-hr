import { useState, useEffect, useCallback } from "react";
import { Redirect, useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import Header from "../Header";
import SideBar from "../SideBar";
import "./style.css";

import logo from "../../images/logo.png";
import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";

function FreelancerUpdate() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [freelancer, setFreelancer] = useState();

  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    Email: "",
    CIN: "",
    TEL: "",
    Adresse: "",
    Sujet: "",
    DateDeDebut: "",
    DateDeFin: "",
    CV: null,
    Portefolio: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/freelancer/show/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFreelancer(res.data);
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
  function hendleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://stagiaire.herokuapp.com/api/freelancer/update/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        console.log("hh");
        history.push("/freelancer/" + id);
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
          <div className="entrepreneurUpdateBox">
            <div className="stageTitle">{freelancer.Sujet}</div>
            <form onSubmit={hendleSubmit}>
              <div className="entrepreneurUpdateForm">
                <div className="entrepreneurUpdateSectionTitle">
                  <p>LES INFORMATIONS PERSONNELLES</p>
                </div>
                <div className="entrepreneurUpdateFormSection">
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Prenom</label>
                    <input
                      type="text"
                      name="Prenom"
                      placeholder={freelancer.Prenom}
                      onChange={(e) =>
                        setFormData({ ...formData, Prenom: e.target.value })
                      }
                      value={formData.Prenom}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="Nom"
                      placeholder={freelancer.Nom}
                      onChange={(e) =>
                        setFormData({ ...formData, Nom: e.target.value })
                      }
                      value={formData.Nom}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder={freelancer.Email}
                      onChange={(e) =>
                        setFormData({ ...formData, Email: e.target.value })
                      }
                      value={formData.Email}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>CIN</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={freelancer.CIN}
                      onChange={(e) =>
                        setFormData({ ...formData, CIN: e.target.value })
                      }
                      value={formData.CIN}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>TEL</label>
                    <input
                      type="text"
                      name="TEL"
                      placeholder={freelancer.TEL}
                      onChange={(e) =>
                        setFormData({ ...formData, TEL: e.target.value })
                      }
                      value={formData.TEL}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Adresse</label>
                    <input
                      type="text"
                      name="TEL"
                      placeholder={freelancer.Adresse}
                      onChange={(e) =>
                        setFormData({ ...formData, Adresse: e.target.value })
                      }
                      value={formData.Adresse}
                    ></input>
                  </div>
                </div>
                <div className="entrepreneurUpdateSectionTitle">
                  <p>Stagiaire Information</p>
                </div>
                <div className="entrepreneurUpdateFormSection">
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Sujet</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={freelancer.Sujet}
                      onChange={(e) =>
                        setFormData({ ...formData, Sujet: e.target.value })
                      }
                      value={formData.Sujet}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Date de Debut</label>
                    <input
                      name="CIN"
                      placeholder={freelancer.DateDeDebut}
                      onFocus={(target) => {
                        target.target.type = "date";
                      }}
                      onBlur={(target) => {
                        target.target.type = "text";
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          DateDeDebut: e.target.value,
                        })
                      }
                      value={formData.DateDeDebut}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Date De Fin</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={freelancer.DateDeFin}
                      onFocus={(target) => {
                        target.target.type = "date";
                      }}
                      onBlur={(target) => {
                        target.target.type = "text";
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, DateDeFin: e.target.value })
                      }
                      value={formData.DateDeFin}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Portefolio</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={freelancer.Portefolio}
                      onChange={(e) =>
                        setFormData({ ...formData, Portefolio: e.target.value })
                      }
                      value={formData.Portefolio}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>CV</label>
                    <input
                      type="file"
                      name="CV"
                      placeholder={freelancer.CV}
                      onChange={(e) =>
                        setFormData({ ...formData, CV: e.target.files[0].name })
                      }
                    ></input>
                  </div>
                </div>
                <div className="entrepreneurUpdateFormButoon">
                  <button type="submit">Active</button>
                  <Link to={"/freelancer/" + freelancer.id}>
                    {" "}
                    <button id="enterpreneurButoonCancel">Cancel</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerUpdate;
