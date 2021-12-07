import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";

import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import "../style.css";
import "./style.css";

import arrowBack from "../../../images/icons/arrowBack.png";
import editContact from "../../../images/icons/editContact.png";
import removeContact from "../../../images/icons/removeContact.png";
import incomingCall from "../../../images/icons/incomingCall.png";
import outgoingCall from "../../../images/icons/outgoingCall.png";
import rejectedCall from "../../../images/icons/rejectedCall.png";
import missedCall from "../../../images/icons/missedCall.png";
import clockIcon from "../../../images/icons/clockIcon.png";

function Call() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [isLoading3, setLoading3] = useState(true);
  const [user, setUser] = useState();
  const [call, setCall] = useState();
  const [contact, setContact] = useState();
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
    axios
      .get("https://stagiaire.herokuapp.com/api/Call/show/1", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setCall(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isLoading2 && isLoading3) {
    setLoading3(false);
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/Client/" + call.TEL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setContact(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // COMPONENT FUNCTIONS

  function timeSecondTohmin(e) {
    if (e === 0) return 0;
    var min = parseInt(e / 60);
    if (min === 0) return e + "s";
    if (min < 60 && e - min * 60 !== 0)
      return min + "." + (e - min * 60) + "min";
    if (min < 60) return min + "min";
    var h = parseInt(min / 60);
    if (min - h * 60 !== 0) return h + "h" + (min - h * 60) + "min";
    return h + "h";
  }

  if (!isLoading2) {
    var callType = null;
    if (call.CallType === 1)
      callType = (
        <div className="callInfoTypeText">
          <img src={incomingCall} />
          <p>incoming call</p>
        </div>
      );
    if (call.CallType === 2)
      callType = (
        <div className="callInfoTypeText">
          <img src={outgoingCall} />
          <p>outgoing call</p>
        </div>
      );
    if (call.CallType === 3)
      callType = (
        <div className="callInfoTypeText">
          <img src={rejectedCall} />
          <p>rejected call</p>
        </div>
      );
    if (call.CallType === 4)
      callType = (
        <div className="callInfoTypeText">
          <img src={missedCall} />
          <p>missedcall call</p>
        </div>
      );
  }

  /////////////////////////////////////////////////////////

  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }

  if (isLoading || isLoading2 || isLoading3 || !contact) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="box">
      <Header user={user} />
      <div className="homeContainer">
        <SideBar user={user} />
        <div className="dashborde">
          <div className="ContactBorde">
            {/* {isLoading2 === true ? <div className="ContactBordLoading">loading ...</div>: */}
            <div className="ContactCard">
              <div className="ContactCardHeader">
                <div className="ContactCardHeaderBack">
                  <Link to={"/CallCenterList"}>
                    <img src={arrowBack} alt="arrowBack" />
                  </Link>
                </div>
                <div className="ContactCardHeaderProp">
                  <div className="ContactCardHeaderEdit">
                    <Link to={"/CallUpdate/" + id}>
                      <img src={editContact} />
                    </Link>
                  </div>
                  <div className="ContactCardHeaderRemove">
                    <img src={removeContact} />
                  </div>
                </div>
              </div>
              <div className="callInfo">
                <div className="callInfoDetails">
                  <div className="callInfoName">
                    {contact.Nom}
                    {contact.Prenom}
                  </div>
                  {callType}
                  <div className="callInfoTime">
                    <img src={clockIcon} />
                    {timeSecondTohmin(call.DureeDappel)}
                  </div>
                </div>
                <div className="callInfoPerss">
                  <div className="callInfoPerssDoubleGroup">
                    <div className="callInfoPersDoubleData">
                      <div className="callInfoPersDataTitle">PHONE NUMBER</div>
                      <div className="callInfoPersData">{call.TEL}</div>
                    </div>
                    <div className="callInfoPersDoubleData">
                      <div className="callInfoPersDataTitle">DATE</div>
                      <div className="callInfoPersData">
                        {call.Date} {call.Heure}
                      </div>
                    </div>
                  </div>
                  <div className="callInfoPerssGroup">
                    <div className="callInfoPersDataTitle">DESCRIPTION</div>
                    <div className="callInfoPersData">{call.Description}</div>
                  </div>
                  <div className="callInfoPerssDoubleGroup">
                    <div className="callInfoPersDoubleData">
                      <div className="callInfoPersDataTitle">STTAF</div>
                      <div className="callInfoPersData">{call.Staff}</div>
                    </div>
                    <div className="callInfoPersDoubleData">
                      <div className="callInfoPersDataTitle">SOCIETE</div>
                      <div className="callInfoPersData">{contact.Societe}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* } */}
      </div>
    </div>
  );
}
export default Call;
