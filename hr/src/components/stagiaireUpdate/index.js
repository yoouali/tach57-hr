import { useState, useEffect, useCallback } from "react";
import { Redirect, useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import "./style.css";
import Header from "../Header";
import SideBar from "../SideBar";
import logo from "../../images/logo.png";
import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";

function StagiaireUpdate() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [stagiaire, setStagiaire] = useState();

  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    Email: "",
    CIN: "",
    TEL: "",
    DateDeNaissance: "",
    LieuDeNaissance: "",
    SujetDeStage: "",
    DateDeDebut: "",
    DateDeFin: "",
    TypeDeStage: "",
    Etablissement: "",
    Filiere: "",
    Niveau: "",
    CV: null,
    Assurance: null,
    Convention: null,
    FicheDeStagiaire: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/stagiaire/show/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setStagiaire(res.data.data);
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
        "https://stagiaire.herokuapp.com/api/stagiaire/update/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("hh");
        history.push("/Stagiaire/" + id);
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
            <div className="stageTitle">{stagiaire.SujetDeStage}</div>
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
                      placeholder={stagiaire.Prenom}
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
                      placeholder={stagiaire.Nom}
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
                      placeholder={stagiaire.Email}
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
                      placeholder={stagiaire.CIN}
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
                      placeholder={stagiaire.TEL}
                      onChange={(e) =>
                        setFormData({ ...formData, TEL: e.target.value })
                      }
                      value={formData.TEL}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Date de naissance</label>
                    <input
                      type="text"
                      name="DateDeNaissance"
                      placeholder={stagiaire.DateDeNaissance}
                      onFocus={(target) => {
                        target.target.type = "date";
                      }}
                      onBlur={(target) => {
                        target.target.type = "text";
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          DateDeNaissance: e.target.value,
                        })
                      }
                      value={formData.DateDeNaissance}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Lieu de naissance</label>
                    <input
                      type="text"
                      name="LieuDeNaissance"
                      placeholder={stagiaire.LieuDeNaissance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          LieuDeNaissance: e.target.value,
                        })
                      }
                      value={formData.LieuDeNaissance}
                    ></input>
                  </div>
                </div>
                <div className="entrepreneurUpdateSectionTitle">
                  <p>Stagiaire Information</p>
                </div>
                <div className="entrepreneurUpdateFormSection">
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Sujet De Stage</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.SujetDeStage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          SujetDeStage: e.target.value,
                        })
                      }
                      value={formData.SujetDeStage}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Date de Debut</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.DateDeDebut}
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
                      placeholder={stagiaire.DateDeFin}
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
                    <label>Type de Stage</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.TypeDeStage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          TypeDeStage: e.target.value,
                        })
                      }
                      value={formData.TypeDeStage}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Etablissement</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.Etablissement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Etablissement: e.target.value,
                        })
                      }
                      value={formData.Etablissement}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Filiere</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.Filiere}
                      onChange={(e) =>
                        setFormData({ ...formData, Filiere: e.target.value })
                      }
                      value={formData.Filiere}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Niveau</label>
                    <input
                      type="text"
                      name="CIN"
                      placeholder={stagiaire.Niveau}
                      onChange={(e) =>
                        setFormData({ ...formData, Niveau: e.target.value })
                      }
                      value={formData.Niveau}
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>CV</label>
                    <input
                      type="file"
                      name="CV"
                      placeholder={stagiaire.CV}
                      onChange={(e) =>
                        setFormData({ ...formData, CV: e.target.files[0] })
                      }
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Assurance</label>
                    <input
                      type="file"
                      name="Assurance"
                      placeholder={stagiaire.Assurance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Assurance: e.target.files[0],
                        })
                      }
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Convention</label>
                    <input
                      type="file"
                      name="Convention"
                      placeholder={stagiaire.Convention}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Convention: e.target.files[0],
                        })
                      }
                    ></input>
                  </div>
                  <div className="entrepreneurUpdateInputGroupe">
                    <label>Fiche De Stagiaire</label>
                    <input
                      type="file"
                      name="FicheDeStagiaire"
                      placeholder={stagiaire.FicheDeStagiaire}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          FicheDeStagiaire: e.target.files[0],
                        })
                      }
                    ></input>
                  </div>
                </div>
                <div className="entrepreneurUpdateFormButoon">
                  <button type="submit">Active</button>
                  <Link to={"/Stagiaire/" + stagiaire.id}>
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

export default StagiaireUpdate;
