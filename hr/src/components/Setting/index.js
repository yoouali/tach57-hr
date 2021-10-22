import axios from "axios";
import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import { Link } from "react-router-dom";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';
import Freelancer from '../freelancer';


function Setting(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');

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

    if (isLoading) {return <div className="App">Loading...</div>;}
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
    return (
<div className="box">
            <section>
                <div className="header">
                    <div className="logo"><img src={logo} alt="teck-57-log"/></div>
                    <div id="user" className="user">
                        <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.Role}</span></div>
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
                <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
                </div>
                <div className="dashborde">
                    <div className="updateUserBox">
                        <div className="updateUserLeftBar">
                            <div className="updateUserLeftBarTitle">Profile Management</div>
                            <hr></hr>
                            <div className="updateUserLeftBarSection"> <p className="updateUserLeftBarSectionChose">Information</p></div>
                            <div className="updateUserLeftBarSection">Password</div>
                        </div>
                        <div className="updateUserRightBar">
                            <form id="perinfo">
                            <div className="entrepreneurUpdateSectionTitle"><p> Personnelles Information</p></div>
                            <div className="updateUserFormSection">
                                <div className="updateUserInputGroupe">
                                    <label>Prenom</label>
                                    <input type="text" name="Prenom" placeholder={user.Prenom}
                                          ></input>
                                </div>
                                <div className="updateUserInputGroupe">
                                    <label >Nom</label>
                                    <input type="text"  name="Nom" placeholder={user.Nom}
                                          ></input>
                                </div>
                            </div>
                            </form>
                            <form id="passwordChange">
                            <div className="entrepreneurUpdateSectionTitle"><p>Password Change</p></div>
                            <div className="updateUserFormSection">
                                <div className="updateUserInputGroupe">
                                    <label>Old Password</label>
                                    <input type="password" name="oldPassword" placeholder=""
                                          ></input>
                                </div>
                                <div className="updateUserInputGroupe">
                                    <label >New Password</label>
                                    <input type="password"  name="newPassword" placeholder=""
                                          ></input>
                                </div>
                                <div className="updateUserInputGroupe">
                                    <label >New Password Confermation</label>
                                    <input type="password"  name="newPasswordC" placeholder=""
                                          ></input>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting