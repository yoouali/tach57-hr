import {useState, useEffect, useCallback} from 'react';
import { Redirect, useParams  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';


import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';

function EntrepreneurUpdate(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [entrepreneur, setEntrepreneur] = useState();


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/auto-entrepreneur/show/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res);
            setEntrepreneur(res.data);
            setLoading2(false);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);


    function handelUserNav(){
        let element = document.getElementById("userNav");
        if (element.style.display === "none")
            element.style.display="block";
        else
            element.style.display="none";
        
    }
    document.addEventListener("click", function(evt) {
        let flyoutEl = document.getElementById('user'),
          targetEl = evt.target; // clicked element      
        do {
          if(targetEl === flyoutEl) {
            // This is a click inside, does nothing, just return.
           console.log("click inside");
            return;
          }
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (document.getElementById("userNav") && document.getElementById("userNav").style.display === "block")
            document.getElementById("userNav").style.display = "none";
    });



    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
    
    if (isLoading || isLoading2) {return <div className="App">Loading...</div>;}

    return(
        <div className="box">
        <section>
            <div className="header">
                <div className="logo"><img src={logo} alt="teck-57-log"/></div>
                <div id="user" className="user">
                    <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.role}</span></div>
                    <ul id="userNav" className="user-nav">
                        <li>Profile</li>
                        <Link to="../Setting">
                        <li>Setting</li></Link>
                        <li className="logout">logout</li>
                    </ul>
                </div>
            </div>
        </section>
        <div className="homeContainer">
            <div className="sideBar">
                <Link to="/"> <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
                <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
                <div><img src={freelancerIcon} alt="profileicon" /></div>
            </div>
            <div className="dashborde">
                <div className="entrepreneurUpdateBox">
                    <div className="stageTitle">{entrepreneur.Nom} {entrepreneur.Prenom}</div>
                        <form>
                        <div className="entrepreneurUpdateForm">
                            <div className="entrepreneurUpdateSectionTitle"><p>Perssonelle Information</p></div>
                            <div class="entrepreneurUpdateFormSection">
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Prenom</label>
                                    <input placeholder={entrepreneur.Prenom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Nom</label>
                                    <input placeholder={entrepreneur.Nom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Email</label>
                                    <input placeholder={entrepreneur.Email}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >CIN</label>
                                    <input placeholder={entrepreneur.CIN}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >TEL</label>
                                    <input placeholder={entrepreneur.TEL}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Adresse</label>
                                    <input placeholder={entrepreneur.Adresse}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Date de naissance</label>
                                    <input placeholder={entrepreneur.DateDeNaissance}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Lieu de naissance</label>
                                    <input placeholder={entrepreneur.LieuDeNaissance}></input>
                                </div>
                            </div>
                            <div className="entrepreneurUpdateSectionTitle"><p>Perssonelle Information</p></div>
                            <div class="entrepreneurUpdateFormSection">
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Prenom</label>
                                    <input placeholder={entrepreneur.Prenom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Nom</label>
                                    <input placeholder={entrepreneur.Nom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Email</label>
                                    <input placeholder={entrepreneur.Email}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >CIN</label>
                                    <input placeholder={entrepreneur.CIN}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >TEL</label>
                                    <input placeholder={entrepreneur.TEL}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Adresse</label>
                                    <input placeholder={entrepreneur.Adresse}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Date de naissance</label>
                                    <input placeholder={entrepreneur.DateDeNaissance}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Lieu de naissance</label>
                                    <input placeholder={entrepreneur.LieuDeNaissance}></input>
                                </div>
                            </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default EntrepreneurUpdate