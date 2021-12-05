import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
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
                <form>
                  <div className="contactUpdateForm">
                    <div className="contactUpdateFormGroup">
                      <label>Phone Number</label>
                      <input type="text" placeholder={contact.TEL} />
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Nom</label>
                      <input type="text" placeholder={contact.Nom} />
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Prenom</label>
                      <input type="text" placeholder={contact.Prenom} />
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Email</label>
                      <input type="text" placeholder={contact.Email} />
                    </div>
                    <div className="contactUpdateFormGroup">
                      <label>Societe</label>
                      <input type="text" placeholder={contact.Societe} />
                    </div>
                  </div>
                  <div className="contactUpdateButtons">
                    <button>Cancel</button>
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
