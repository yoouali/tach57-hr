import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";

import { Link, useHistory } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import "../style.css";
import "./style.css";

import arrowBack from "../../../images/icons/arrowBack.png";

function CallUpdate() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const history = useHistory();
  const [user, setUser] = useState();
  const [call, setCall] = useState();
  const [formData, setFormData] = useState({
    CallType: "",
    Date: "",
    Description: "",
    DureeDappel: "",
    Heure: "",
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

  // COMPONEWNT FUCNTIONS

  function handelSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (
      formData.CallType === "" &&
      formData.Date === "" &&
      formData.Heure === "" &&
      formData.Description === "" &&
      formData.DureeDappel === ""
    ) {
      history.push("/Call/" + id);
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post("https://stagiaire.herokuapp.com/api/Call/update/" + id, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("hh");
        history.push("/Call/" + id);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }

  // //////////////////////////////////

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
                <form onSubmit={handelSubmit} id="callUpdate">
                  <div className="contactUpdateForm">
                    <div className="contactUpdateFromError">her is error</div>
                    <div className="contactUpdateFormGroupDouble">
                      <div className="contactUpdateFormDoubleGroup">
                        <label>CallType</label>
                        <input
                          type="text"
                          placeholder={call.CallType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              CallType: e.target.value,
                            })
                          }
                          value={formData.CallType}
                        />
                      </div>
                      <div className="contactUpdateFormDoubleGroup">
                        <label>DureeDappel(with secondes)</label>
                        <input
                          type="text"
                          placeholder={call.DureeDappel}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              DureeDappel: e.target.value,
                            })
                          }
                          value={formData.DureeDappel}
                        />
                      </div>
                    </div>
                    <div className="callUpdateFormGroup">
                      <label>Description</label>
                      <textarea
                        rows="4"
                        cols="50"
                        name="description"
                        form="callUpdate"
                        placeholder={call.Description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Description: e.target.value,
                          })
                        }
                        value={formData.Description}
                      />
                    </div>
                    <div className="contactUpdateFormGroupDouble">
                      <div className="contactUpdateFormDoubleGroup">
                        <label>Date</label>
                        <input
                          type="text"
                          placeholder={call.Date}
                          onChange={(e) =>
                            setFormData({ ...formData, Date: e.target.value })
                          }
                          value={formData.Date}
                        />
                      </div>
                      <div className="contactUpdateFormDoubleGroup">
                        <label>Heure</label>
                        <input
                          type="text"
                          placeholder={call.Heure}
                          onChange={(e) =>
                            setFormData({ ...formData, Heure: e.target.value })
                          }
                          value={formData.Heure}
                        />
                      </div>
                    </div>
                  </div>
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
