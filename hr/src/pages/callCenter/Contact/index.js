import { useState, useEffect, Text } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import "./style.css";

import phoneIcon from "../../../images/icons/phoneIcon.png";
import clockIcon from "../../../images/icons/clockIcon.png";
import incomingCall from "../../../images/icons/incomingCall.png";
import outgoingCall from "../../../images/icons/outgoingCall.png";
import rejectedCall from "../../../images/icons/rejectedCall.png";
import missedCall from "../../../images/icons/missedCall.png";
import arrowBack from "../../../images/icons/arrowBack.png";
import editContact from "../../../images/icons/editContact.png";
import removeContact from "../../../images/icons/removeContact.png";

function Contact() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [contact, setContact] = useState();
  const [calls, setCalls] = useState();
  const [contactHistory, setContactHistory] = useState();

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
      .get("https://stagiaire.herokuapp.com/api/Client/show/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setContact(res.data[0]);
        setCalls(res.data);
        setContactHistory(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //COMPONENT FUNCTIONS

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

  ///filter calls history
  function historyFilter(e) {
    console.log(document.getElementById(e + "Parent").style.border);
    if (
      document.getElementById(e + "Parent").style.border ===
      "1px solid rgb(17, 125, 176)"
    ) {
      document.getElementById(e + "Parent").style.border = "none";
    } else if (e == "incomingCall") {
      document.getElementById("incomingCallParent").style.border =
        "1px solid #117DB0";
      document.getElementById("outgoingCallParent").style.border = "none";
      document.getElementById("rejectedCallParent").style.border = "none";
      document.getElementById("missedCallParent").style.border = "none";
    } else if (e == "outgoingCall") {
      document.getElementById("outgoingCallParent").style.border =
        "1px solid #117DB0";
      document.getElementById("incomingCallParent").style.border = "none";
      document.getElementById("rejectedCallParent").style.border = "none";
      document.getElementById("missedCallParent").style.border = "none";
    } else if (e == "rejectedCall") {
      document.getElementById("rejectedCallParent").style.border =
        "1px solid #117DB0";
      document.getElementById("incomingCallParent").style.border = "none";
      document.getElementById("outgoingCallParent").style.border = "none";
      document.getElementById("missedCallParent").style.border = "none";
    } else if (e == "missedCall") {
      document.getElementById("missedCallParent").style.border =
        "1px solid #117DB0";
      document.getElementById("incomingCallParent").style.border = "none";
      document.getElementById("rejectedCallParent").style.border = "none";
      document.getElementById("outgoingCallParent").style.border = "none";
    }
  }
  /////////////////////

  // CONTACT HISTORY LIST
  if (contactHistory) {
    var key = 0;
    var callsList = contactHistory.map(function (name) {
      key = key + 1;
      var callType = <img src={outgoingCall} />;
      var callTypeText = "outgoing call";
      return (
        <div key={key} className="ContactHistListItem">
          <div className="ContactHistListItemCall">
            <div className="ContactHistListItemCallType">{callType}</div>
            <div className="ContactHistListItemCallDetails">
              <div className="ContactHistListItemCallDate">{name.Heure}</div>
              <div className="ContactHistListItemCallTypeText">
                {callTypeText}
              </div>
            </div>
          </div>
          <div className="ContactHistListItemTime">
            {timeSecondTohmin(name.DureeDappel)}
          </div>
          <div className="ContactHistListItemDate">2021-12-29</div>
          <div className="ContactHitListItemStaff">youssef elouali</div>
        </div>
      );
    });
  }

  /////////////////////////////////////

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
                    <Link to={"/ContactUpdate/" + id}>
                      <img src={editContact} />
                    </Link>
                  </div>
                  <div className="ContactCardHeaderRemove">
                    <img src={removeContact} />
                  </div>
                </div>
              </div>
              <div className="ContactInfo">
                <div className="ContactPerss">
                  <div className="ContactPerssGroupe">
                    <div className="ContactPerssGroupTitle">Client</div>
                    <div className="ContactPerssGroupData">
                      {contact.Nom === null ? "" : contact.Nom.toUpperCase()}{" "}
                      {contact.Prenom === null
                        ? ""
                        : contact.Prenom.toUpperCase()}
                    </div>
                  </div>
                  <div className="ContactPerssGroupe">
                    <div className="ContactPerssGroupTitle">Phone Number</div>
                    <div className="ContactPerssGroupData">{contact.TEL}</div>
                  </div>
                  <div className="ContactPerssGroupe">
                    <div className="ContactPerssGroupTitle">Societe</div>
                    <div className="ContactPerssGroupData">
                      {contact.Societe}
                    </div>
                  </div>
                </div>
                <div className="ContactCount">
                  <div className="ContactCountGroupe">
                    <div className="ContactCountGroupIcon">
                      <img src={phoneIcon} alt="phoneIcon" />
                    </div>
                    <div className="ContactCountGroupInfo">
                      <div className="ContactCountInfoData">
                        {contact.CallCount}
                      </div>
                      <div className="ContactCountInfoTitle">
                        Total D'appels
                      </div>
                    </div>
                  </div>
                  <div className="ContactCountGroupe">
                    <div className="ContactCountGroupIcon">
                      <img src={clockIcon} alt="clockIcon" />
                    </div>
                    <div className="ContactCountGroupInfo">
                      <div className="ContactCountInfoData">
                        {timeSecondTohmin(contact.DureeDappel)}
                      </div>
                      <div className="ContactCountInfoTitle">
                        Duree D'appels
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ContactHist">
                <div className="ContactHistHeader">
                  <div className="ContactHistTitle">History</div>
                  <div className="ContactHistSort">
                    <div className="ContacHistSortTitle">Sort:</div>
                    <div className="ContactHistSortItems">
                      <div
                        id="incomingCallParent"
                        className="ContactHistSortItem"
                      >
                        <img
                          id="incomingCall"
                          onClick={({ target }) => historyFilter(target.id)}
                          title="incomingcall"
                          src={incomingCall}
                        />
                      </div>
                      <div
                        id="outgoingCallParent"
                        className="ContactHistSortItem"
                      >
                        <img
                          id="outgoingCall"
                          onClick={({ target }) => {
                            historyFilter(target.id);
                          }}
                          title="outgoingcall"
                          src={outgoingCall}
                        />
                      </div>
                      <div
                        id="rejectedCallParent"
                        className="ContactHistSortItem"
                      >
                        <img
                          id="rejectedCall"
                          onClick={({ target }) => {
                            historyFilter(target.id);
                          }}
                          title="rejectedcall"
                          src={rejectedCall}
                        />
                      </div>
                      <div
                        id="missedCallParent"
                        className="ContactHistSortItem"
                      >
                        <img
                          id="missedCall"
                          onClick={({ target }) => {
                            historyFilter(target.id);
                          }}
                          title="missedcall"
                          src={missedCall}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ContactHistList">
                  <div className="ContactHistListHeader">
                    <div className="ConatctHistListHeaderCall">Appel</div>
                    <div className="ConatctHistListHeaderTime">
                      Duree D'appel
                    </div>
                    <div className="onatctHistListHeaderTime">Date</div>
                    <div className="ConatctHistListHeaderSttaf">Staff</div>
                  </div>
                  {callsList}
                </div>
              </div>
            </div>
          </div>
          {/* } */}
        </div>
      </div>
    </div>
  );
}
export default Contact;
