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
                    <div className="addUserLaoding">
                        <svg width="407" height="99" viewBox="0 0 407 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M66.5 2.20856H0V19.2086H23.5V96.2086H44V19.2086H66.5V2.20856Z" fill="#117DB0" className="svg-elem-1"></path>
                            <path d="M160 2.20856H104.5V96.7086H160V79.2086H125V55.2086H160V37.7086H125V19.2086H160V2.20856Z" fill="#117DB0" className="svg-elem-2"></path>
                            <path d="M201 48.7086C203 -17.2919 282 1.20856 282 6.20856V26.2086C282 23.209 223 4.70898 223 48.7086C223 92.7082 282 75.209 282 70.7086V90.7086C282 98.209 199 114.709 201 48.7086Z" fill="#117DB0" className="svg-elem-3"></path>
                            <path d="M346 2.20898H325.5V96.209H346V57.709H386V96.209H406.5V2.20898H386V39.709H346V2.20898Z" fill="#117DB0" className="svg-elem-4"></path>
                        </svg>  
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser