import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";

import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import "../style.css";
import "./style.css";

import arrowBack from "../../../images/icons/arrowBack.png";

function CallUpdate() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [call, setCall] = useState();

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
                  <Link to={"/Call/" + id}>
                    <img src={arrowBack} alt="arrowBack" />
                  </Link>
                </div>
              </div>
              <div className="ContactUpdateBord">
                <form>
                  <div className="contactUpdateButtons">
                    <Link to={"/Call/" + id}>
                      <button>Cancel</button>
                    </Link>
                    <button>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CallUpdate;
