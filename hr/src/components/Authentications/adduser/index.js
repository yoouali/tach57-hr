import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../../images/logo.png';
import profileIcon from '../../../images/icons/person.png';
import entrepreneurIcon from '../../../images/icons/entrepreneur.png';
import stagiaireIcon from '../../../images/icons/stagiaire.png';
import freelancerIcon from '../../../images/icons/freelancer.png';




function AddUser(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [formData, setFormData] = useState({ Prenom: '', Nom: '', CIN: '', TEL: '', Email: '', Role: '',});

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
    
      
    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            Prenom: formData.Prenom,
            Nom: formData.Nom,
            Email: formData.Email,
            CIN: formData.CIN,
            TEL: formData.TEL,
            Role: formData.Role,
        }
        console.log(data);
        axios.post("https://stagiaire.herokuapp.com/api/addUser",data,{headers: {"Authorization": `Bearer ${token}`}})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}

    if (isLoading) {
            return <div className="App">Loading...</div>;
    }

    return(
        <div className="box">
            <section>
                <div className="header">
                    <div className="logo"><img src={logo} alt="teck-57-log"/></div>
                    <div id="user" className="user">
                        <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.Role}</span></div>
                        <ul id="userNav" className="user-nav">
                            <Link to="/AddUser"><li>New Staff</li></Link>
                            <Link to="../Setting">
                            <li>Setting</li></Link>
                            <Link to="/login"><li  onClick={function(){localStorage.removeItem("token")}} className="logout">logout</li></Link>
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
                    <div className="addUserForm">
                    <form onSubmit={handleSubmit} id="perinfo">
                        <div className="addUserFormTitle"><p>New Staff</p></div>
                        <div className="addUserFormInputs">
                            <div className="addUserFormGroupeInput">
                                <label>Prenom</label>
                                <input required type="text" name="Prenom" 
                                        onChange={(e) => setFormData({...formData, Prenom: e.target.value})}
                                value={formData.Prenom}></input>                                
                            </div>
                            <div className="addUserFormGroupeInput">
                                <label >Nom</label>
                                <input required type="text"  name="Nom" 
                                    onChange={(e) => setFormData({...formData, Nom: e.target.value})}
                                    value={formData.Nom}></input>                                
                            </div>
                            <div className="addUserFormGroupeInput">
                                <label >Email</label>
                                <input required type="email"  name="Email" 
                                    onChange={(e) => setFormData({...formData, Email: e.target.value})}
                                    value={formData.Email}></input>                                
                            </div>
                            <div className="addUserFormGroupeInput">
                                <label >CIN</label>
                                <input type="text"  name="CIN" 
                                    onChange={(e) => setFormData({...formData, CIN: e.target.value})}
                                    value={formData.CIN}></input>                                
                            </div>
                            <div className="addUserFormGroupeInput">
                                <label >TEL</label>
                                <input type="text"  name="TEL" 
                                    onChange={(e) => setFormData({...formData, TEL: e.target.value})}
                                    value={formData.TEL}></input>                                
                            </div>
                            <div className="addUserFormGroupeInput">
                                <label required >Role</label>
                                <input type="text"  name="Role" 
                                    onChange={(e) => setFormData({...formData, Role: e.target.value})}
                                    value={formData.Role}></input>                                
                            </div>
                        </div>
                        <button className="adduserButton" type="submit">Save</button>
                    </form>
                    </div>
                    <div className="addUserLoading">
                    <svg id="addUserLogo" width="407" height="108" viewBox="0 0 407 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M326.528 100.199V102.699H329.028H347.141H349.641V100.199V63.8317H381.387V100.199V102.699H383.887H402H404.5V100.199V7.22266V4.72266H402H383.887H381.387V7.22266V42.002H349.641V7.22266V4.72266H347.141H329.028H326.528V7.22266V100.199Z" stroke="#117DB0" strokeWidth="5"/>
                        <path d="M277.038 33.2033L281.106 37.1982L281.288 31.4992L281.924 11.5576L281.974 9.99696L280.594 9.26746C276.26 6.97726 271.845 5.27124 267.353 4.16075C262.866 3.05182 258.228 2.5 253.443 2.5C239.124 2.5 227.257 7.33236 218.062 17.0644C208.89 26.7726 204.359 39.0769 204.359 53.7744C204.359 68.5089 208.868 80.8524 217.997 90.6031L218.005 90.6114C227.192 100.336 238.958 105.176 253.096 105.176C257.984 105.176 262.657 104.533 267.103 103.235C271.59 101.936 275.862 99.9689 279.916 97.3438L281.05 96.6099L281.058 95.2595L281.173 74.8733L281.208 68.7758L276.903 73.0941C273.517 76.4905 269.882 79.0079 266.001 80.6898C262.128 82.3257 257.913 83.1556 253.327 83.1556C245.34 83.1556 239.28 80.5345 234.845 75.4428C230.365 70.2563 227.993 63.127 227.993 53.7744C227.993 44.241 230.541 36.9332 235.39 31.5725C240.215 26.2396 246.699 23.5041 255.121 23.5041C259.189 23.5041 262.973 24.2852 266.5 25.8336L266.511 25.8382L266.521 25.8428C270.037 27.3477 273.546 29.7749 277.038 33.2033Z" stroke="#117DB0" strokeWidth="5"/>
                        <path d="M43.8872 102.699H46.3872V100.199V26.6159H64.7197H67.2197V24.1159V7.22266V4.72266H64.7197H5H2.5V7.22266V24.1159V26.6159H5H23.2167V100.199V102.699H25.7167H43.8872Z" stroke="#117DB0" strokeWidth="5"/>
                        <path d="M106.983 100.199V102.699H109.483H159.365H161.865V100.199V83.3056V80.8056H159.365H130.096V62.4981H159.365H161.865V59.9981V43.1049V40.6049H159.365H130.096V26.4888H159.365H161.865V23.9888V7.22266V4.72266H159.365H109.483H106.983V7.22266V100.199Z" stroke="#117DB0" strokeWidth="5"/>
                    </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser