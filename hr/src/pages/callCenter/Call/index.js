import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";

import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import "../style.css";

import arrowBack from "../../../images/icons/arrowBack.png";
import editContact from "../../../images/icons/editContact.png";
import removeContact from "../../../images/icons/removeContact.png";
import incomingCall from "../../../images/icons/incomingCall.png";
import outgoingCall from "../../../images/icons/outgoingCall.png";
import rejectedCall from "../../../images/icons/rejectedCall.png";
import missedCall from "../../../images/icons/missedCall.png";

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
      .get("https://stagiaire.herokuapp.com/api/Client/show/1", {
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
    const token = localStorage.getItem("token");
    axios
      .get("https://stagiaire.herokuapp.com/api/Client/" + call.TEL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setContact(res.data);
        setLoading3(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isLogged = localStorage.getItem("token");
  if (!isLogged || isLogged === undefined) {
    return <Redirect to="/login" />;
  }

  if (isLoading || isLoading2 || isLoading3) {
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
              <div className="CallInfo"></div>
            </div>
          </div>
        </div>
        {/* } */}
      </div>
    </div>
  );
}
export default Call;
