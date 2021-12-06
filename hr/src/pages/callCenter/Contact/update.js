import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import arrowBack from "../../../images/icons/arrowBack.png";
import "./style.css";

function ContactUpdate() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [user, setUser] = useState();
  const [contact, setContact] = useState();
  const history = useHistory();
  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    Email: "",
    TEL: "",
    Societe: "",
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
      .get("https://stagiaire.herokuapp.com/api/Client/show/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setContact(res.data[0]);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // COMPONENT FUNCTIONS

  function handelSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (
      formData.Email === "" &&
      formData.Nom === "" &&
      formData.Prenom === "" &&
      formData.TEL === "" &&
      formData.Societe === ""
    ) {
      history.push("/Contact/" + id);
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://stagiaire.herokuapp.com/api/Client/update/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("hh");
        history.push("/Contact/" + id);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }

  ///////////////////////////////////////////

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
                  <Link to={"/Contact/" + id}>
                    <img src={arrowBack} alt="arrowBack" />
                  </Link>
                </div>
              </div>
              <div className="ContactUpdateBord">
                <form onSubmit={handelSubmit}>
                  <div className="contactUpdateForm">
                    <div className="contactUpdateFromError">her is error</div>
                    <div className="contactUpdateFormGroup">
                      <label>Phone Number (+6-7********)</label>
                      <input
                        type="tel"
                        pattern="[0-0]{1}[6-7]{1}[0-9]{8}"
                        placeholder={contact.TEL}
                        onChange={(e) =>
                          setFormData({ ...formData, TEL: e.target.value })
                        }
                        value={formData.TEL}
                      />
                    </div>
                    <div className="contactUpdateFormGroupDouble">
                      <div className="contactUpdateFormDoubleGroup">
                        <label>Nom</label>
                        <input
                          type="text"
                          placeholder={contact.Nom}
                          onChange={(e) =>
                            setFormData({ ...formData, Nom: e.target.value })
                          }
                          value={formData.Nom}
                        />
                      </div>
                      <div className="contactUpdateFormDoubleGroup">
                        <label>Prenom</label>
                        <input
                          type="text"
                          placeholder={contact.Prenom}
                          onChange={(e) =>
                            setFormData({ ...formData, Prenom: e.target.value })
                          }
                          value={formData.Prenom}
                        />
                      </div>
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder={contact.Email}
                        onChange={(e) =>
                          setFormData({ ...formData, Email: e.target.value })
                        }
                        value={formData.Email}
                      />
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Societe</label>
                      <input
                        type="text"
                        placeholder={contact.Societe}
                        onChange={(e) =>
                          setFormData({ ...formData, Societe: e.target.value })
                        }
                        value={formData.Societe}
                      />
                    </div>
                  </div>
                  <div className="contactUpdateButtons">
                    <Link to={"/Contact/" + id}>
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
export default ContactUpdate;
