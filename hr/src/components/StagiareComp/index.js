import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Header from "../Header";
import SideBar from "../SideBar";
import "./style.css";

import logo from "../../images/logo.png";
import profileIcon from "../../images/icons/person.png";
import entrepreneurIcon from "../../images/icons/entrepreneur.png";
import stagiaireIcon from "../../images/icons/stagiaire.png";
import freelancerIcon from "../../images/icons/freelancer.png";

function StagiaireComp() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [stage, setStage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/stagiaire/show/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setStage(res.data.data);
        setLoading(false);
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
        setLoading2(false);
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

  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }

  if (isLoading || isLoading2) {
    return <div className="App">Loading...</div>;
  }
  if (!isLoading && !isLoading2 && stage) {
    var Etablissement = null;
    if (stage.Etablissement !== null)
      Etablissement = (
        <div className="groupeInfo">
          <div className="infoTitle">Etablissement</div>
          <div className="infoValue">{stage.Etablissement}</div>
        </div>
      );
    var Filiere = null;
    if (stage.Filiere !== null)
      Filiere = (
        <div className="groupeInfo">
          <div className="infoTitle">Filiere</div>
          <div className="infoValue">{stage.Filiere}</div>
        </div>
      );
    var Niveau = null;
    if (stage.Niveau !== null)
      Niveau = (
        <div className="groupeInfo">
          <div className="infoTitle">Niveau</div>
          <div className="infoValue">{stage.Niveau}</div>
        </div>
      );
    var stageBox = null;
    if (stage.Active === 0)
      stageBox = (
        <div id="stageNotActive" className="stageStatus">
          <p id="boxstagiaireactive1">Not Active</p>
          <p id="boxstagiaireactive2"> &#10007;</p>
        </div>
      );
    if (stage.Active === 1 && stage.Finir === 0)
      stageBox = (
        <div id="stageActive" className="stageStatus">
          <p>in progress</p>
          <p> &#9991;</p>
        </div>
      );
    if (stage.Active === 1 && stage.Finir === 1 && stage.Attestation === 0)
      stageBox = (
        <div id="stageOver" className="stageStatus">
          <p id="boxstagefinshed1">Over</p>
          <p id="boxstagefinshed2"> &#10003;</p>
        </div>
      );
    if (stage.Active === 1 && stage.Finir === 1 && stage.Attestation === 1)
      stageBox = (
        <div id="stageFineshd" className="stageStatus">
          <p> Finshed </p>
          <p> &#10003;</p>
        </div>
      );
    var Convention = null;
    if (stage.Convention !== null)
      Convention = (
        <div className="stageFile">
          <p>Convention</p>
        </div>
      );
    var Attestation = null;
    if (stage.Active === 0)
      Attestation = (
        <div id="activeSctiveButton" className="stageButton">
          <button onClick={activeStagiaire}>Active</button>
        </div>
      );
    if (stage.Active === 1 && stage.Finir === 1 && stage.Attestation === 0)
      Attestation = (
        <div id="attestationStagiaireButtoon" className="stageButton">
          <button onClick={attestationStagiaire}>Attestation</button>
        </div>
      );
    if (stage.Active === 1 && stage.Finir === 1 && stage.Attestation === 1)
      Attestation = (
        <div className="stageFile">
          <p>Attestation</p>
        </div>
      );
  }

  function stagiaireRemove() {
    swal("are you sure you whant to remove this item").then((value) => {
      if (value === true) {
        console.log("dfsdfsdf");
        const token = localStorage.getItem("token");
        const url =
          "https://stagiaire.herokuapp.com/api/stagiaire/delete/" + id;
        axios
          .get(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log(res);
            history.push("/Stagiairelist");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  function activeStagiaire() {
    const token = localStorage.getItem("token");
    const url =
      "https://stagiaire.herokuapp.com/api/stagiaire/active/" + stage.id;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        document.getElementById("activeSctiveButton").style.display = "none";
        document.getElementById("stageNotActive").style.backgroundColor =
          "#117DB0";
        document.getElementById("boxstagiaireactive1").innerText =
          "in progress";
        document.getElementById("boxstagiaireactive2").innerText = "✓";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function attestationStagiaire() {
    const token = localStorage.getItem("token");
    const url =
      "https://stagiaire.herokuapp.com/api/stagiaire/attestation/" + stage.id;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        document.getElementById("attestationStagiaireButtoon").style.display =
          "none";
        document.getElementById("stageOver").style.backgroundColor = "#11B03E";
        document.getElementById("boxstagefinshed1").innerText = "finshed";
        document.getElementById("boxstagefinshed2").innerText = "✓";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="box">
      <Header user={user} />
      <div className="homeContainer">
        <SideBar user={user} />
        <div className="dashborde">
          <div className="stageBar">
            <div className="stageTitle">{stage.SujetDeStage}</div>
            <div className="stageInfo">
              <div className="leftInfo">
                {stageBox}
                <div className="stageFile">
                  <p>Fiche du Stagiaire</p>
                </div>
                <div className="stageFile">
                  <p>CV</p>
                </div>
                <div className="stageFile">
                  <p>Assurance</p>
                </div>
                {Convention}

                {Attestation}
                <div className="stageButton">
                  <Link to={"/StagiaireUpdate/" + stage.id}>
                    {" "}
                    <button>Edit</button>
                  </Link>
                </div>
                <div className="stageButton">
                  <button onClick={stagiaireRemove} id="stageButtonRemove">
                    Remove
                  </button>
                </div>
              </div>
              <div className="rightInfo">
                <div className="stageDate">
                  <div className="dateInfo">
                    <p>Start at {stage.DateDeDebut} &#9716;</p>
                  </div>
                  <div className="dateInfo">
                    <p>Over at {stage.DateDeFin} &#9719;</p>
                  </div>
                </div>
                <div className="perInfo">
                  <div className="perInfoTitle">
                    <p>
                      Descreption <span>&#128396;</span>
                    </p>
                    <hr id="Desc"></hr>
                  </div>
                  <div className="descInfo">
                    <p>
                      This HTML file is a template. If you open it directly in
                      the browser, you will see an empty page. You can add
                      webfonts, meta tags, or analytics to this file. The build
                      step will place the bundled scripts into the
                    </p>
                  </div>
                </div>
                <div className="perInfo">
                  <div className="perInfoTitle">
                    <p>
                      Stagiaire Information <span>&#128396;</span>
                    </p>
                    <hr></hr>
                  </div>
                  <div className="perInfoData">
                    <div className="groupeInfo">
                      <div className="infoTitle">name</div>
                      <div className="infoValue">
                        {stage.Nom} {stage.Prenom}
                      </div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">Email</div>
                      <div className="infoValue">{stage.Email}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">CIN</div>
                      <div className="infoValue">{stage.CIN}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">TEL</div>
                      <div className="infoValue">{stage.TEL}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">birtday</div>
                      <div className="infoValue">{stage.DateDeNaissance}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">birtplace</div>
                      <div className="infoValue">{stage.LieuDeNaissance}</div>
                    </div>
                    <div className="groupeInfo">
                      <div className="infoTitle">Type de Stage</div>
                      <div className="infoValue">{stage.TypeDeStage}</div>
                    </div>
                    {Etablissement}
                    {Filiere}
                    {Niveau}
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

export default StagiaireComp;
