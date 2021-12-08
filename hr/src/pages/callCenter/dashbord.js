import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

import phoneIcon from "../../images/icons/phoneIcon.png";
import clockIcon from "../../images/icons/clockIcon.png";
import incomingCall from "../../images/icons/incomingCall.png";
import outgoingCall from "../../images/icons/outgoingCall.png";
import rejectedCall from "../../images/icons/rejectedCall.png";
import missedCall from "../../images/icons/missedCall.png";
import arrowBack from "../../images/icons/arrowBack.png";
import editContact from "../../images/icons/editContact.png";
import removeContact from "../../images/icons/removeContact.png";
import backgroundAdd from "../../images/background.jpg";

function CallCenterDashBord({ user }) {
  const history = useHistory();
  const [CallData, setCallData] = useState({
    TEL: "",
    CallType: "",
    DureeDappel: "",
    Description: "",
    Date: "",
    Heure: "",
  });
  const [ContactData, setContactData] = useState({
    TEL: "",
    Nom: "",
    Prenom: "",
    Email: "",
    Societe: "",
  });

  // COMPONENT FUNCTIONS

  function handelCallSubmit(e) {
    document.getElementById("addCallButton").style.display = "none";
    e.preventDefault();
    console.log(CallData);
    const token = localStorage.getItem("token");
    axios
      .post("https://stagiaire.herokuapp.com/api/Call/store", CallData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("result");
        console.log(res);
        if (res.data === "Ce numero de telephone n'est pas existe") {
          document.getElementById("addCallError").style.display = "block";
          document.getElementById("addCallError").innerText = res.data;
          setTimeout(() => {
            document.getElementById("addCallError").style.display = "none";
          }, 2000);
        }
        document.getElementById("addCallButton").style.display = "block";
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        document.getElementById("addCallButton").style.display = "block";
      });
  }

  function handelContactSubmit(e) {
    document.getElementById("addContactButton").style.display = "none";
    e.preventDefault();
    console.log(ContactData);
    const token = localStorage.getItem("token");
    axios
      .post("https://stagiaire.herokuapp.com/api/Client/store", ContactData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("result");
        console.log(res);
        if (res.data === "Ce numero de telephone n'est pas existe") {
          document.getElementById("addContactError").style.display = "block";
          document.getElementById("addContactError").innerText = res.data;
          setTimeout(() => {
            document.getElementById("addContactError").style.display = "none";
          }, 2000);
        }
        document.getElementById("addContactButton").style.display = "block";
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        document.getElementById("addContactError").style.display = "block";
        document.getElementById("addContactError").innerText = "Server Error";
        setTimeout(() => {
          document.getElementById("addContactError").style.display = "none";
        }, 2000);
        document.getElementById("addContactButton").style.display = "block";
      });
  }

  // ////////////////////////////////////////////////

  return (
    <div className="callCenterAdd">
      <div className="callCenterAddHide">
        <p
          id="downuparrow"
          onClick={() => {
            console.log("hh ");
            if (document.getElementById("addCall").style.display !== "none") {
              document.getElementById("addCall").style.display = "none";
              document.getElementById("addContact").style.display = "none";
              document.getElementById("downuparrow").innerText = "🢗";
            } else {
              document.getElementById("addCall").style.display = "block";
              document.getElementById("addContact").style.display = "block";
              document.getElementById("downuparrow").innerText = "🢕";
            }
          }}
        >
          🢗
        </p>
      </div>
      <div className="callCenterAddCall">
        <div className="callCenterAddTitle">ADD CALL</div>
        <form id="addCall" onSubmit={handelCallSubmit}>
          <div className="callCenterAddCallGroupe">
            <label>Phone Number </label>
            <input
              type="tel"
              pattern="[0-0]{1}[6-7]{1}[0-9]{8}"
              placeholder="(+6-7********)"
              onChange={(e) =>
                setCallData({ ...CallData, TEL: e.target.value })
              }
              value={CallData.TEL}
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>CallType</label>
              <select
                onChange={(e) =>
                  setCallData({ ...CallData, CallType: e.target.value })
                }
                value={CallData.CallType}
              >
                <option value="">Call Type</option>
                <option value="1">incoming call</option>
                <option value="2">outgoing call</option>
                <option value="3">rejected call</option>
                <option value="4">missed call</option>
              </select>
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Duree Dappel</label>
              <input
                onChange={(e) =>
                  setCallData({ ...CallData, DureeDappel: e.target.value })
                }
                value={CallData.DureeDappel}
                type="text"
                placeholder="duree dappel with seconds"
              />
            </div>
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Description</label>
            <textarea
              onChange={(e) =>
                setCallData({ ...CallData, Description: e.target.value })
              }
              value={CallData.Description}
              rows="4"
              cols="50"
              name="description"
              form="addCall"
              placeholder="call descreption"
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>Date </label>
              <input
                onChange={(e) =>
                  setCallData({ ...CallData, Date: e.target.value })
                }
                value={CallData.Date}
                type="text"
                placeholder="yyyy-dd-mm"
              />
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Heure </label>
              <input
                onChange={(e) =>
                  setCallData({ ...CallData, Heure: e.target.value })
                }
                value={CallData.Heure}
                type="text"
                placeholder="HH-MM"
              />
            </div>
          </div>
          <div id="addCallError" className="CallCenterAddError"></div>
          <div className="CallCenterAddTail">
            <button id="addCallButton">Add</button>
          </div>
        </form>
      </div>

      <div className="callCenterAddCall">
        <div className="callCenterAddTitle">ADD CONTACT</div>
        <form id="addContact" onSubmit={handelContactSubmit}>
          <div className="callCenterAddCallGroupe">
            <label>Phone Number </label>
            <input
              type="tel"
              pattern="[0-0]{1}[6-7]{1}[0-9]{8}"
              placeholder="(+6-7********)"
              onChange={(e) =>
                setContactData({ ...ContactData, TEL: e.target.value })
              }
              value={ContactData.TEL}
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>Nom</label>
              <input
                placeholder="Nom"
                onChange={(e) =>
                  setContactData({ ...ContactData, Nom: e.target.value })
                }
                value={ContactData.Nom}
              />
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Prenom</label>
              <input
                placeholder="Nom"
                onChange={(e) =>
                  setContactData({ ...ContactData, Prenom: e.target.value })
                }
                value={ContactData.Prenom}
              />
            </div>
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Email</label>
            <input
              placeholder="Email"
              onChange={(e) =>
                setContactData({ ...ContactData, Email: e.target.value })
              }
              value={ContactData.Email}
            />
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Societe</label>
            <input
              placeholder="Societe"
              onChange={(e) =>
                setContactData({ ...ContactData, Societe: e.target.value })
              }
              value={ContactData.Societe}
            />
          </div>
          <div id="addContactError" className="CallCenterAddError"></div>
          <div className="CallCenterAddTail">
            <button id="addContactButton">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CallCenterDashBord;
