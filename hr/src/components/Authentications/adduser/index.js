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
                    <div className="addUserLoading">
                        <svg width="399" height="100" viewBox="0 0 399 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M324.528 96.1988V96.6988H325.028H343.141H343.641V96.1988V57.8317H379.387V96.1988V96.6988H379.887H398H398.5V96.1988V3.22266V2.72266H398H379.887H379.387V3.22266V40.002H343.641V3.22266V2.72266H343.141H325.028H324.528V3.22266V96.1988Z" fill="#117DB0" stroke="white"/>
                            <path d="M274.439 27.7762L275.253 28.5752L275.289 27.4354L275.925 7.4938L275.935 7.18167L275.659 7.03577C271.459 4.81643 267.197 3.17119 262.873 2.10232C258.55 1.03375 254.073 0.5 249.443 0.5C235.623 0.5 224.299 5.14149 215.516 14.4379C206.738 23.7296 202.359 35.5219 202.359 49.7744C202.359 64.0681 206.718 75.9022 215.457 85.2362L215.458 85.2379C224.24 94.5327 235.466 99.1758 249.096 99.1758C253.808 99.1758 258.291 98.5561 262.544 97.3143C266.837 96.0724 270.932 94.1885 274.829 91.665L275.056 91.5182L275.058 91.2481L275.173 70.862L275.18 69.6425L274.319 70.5061C270.772 74.0643 266.928 76.7355 262.788 78.5283C258.649 80.2782 254.164 81.1556 249.327 81.1556C240.847 81.1556 234.204 78.3451 229.335 72.7543C224.458 67.1105 221.993 59.4693 221.993 49.7744C221.993 39.8741 224.647 32.0448 229.907 26.2307C235.162 20.4222 242.215 17.5041 251.121 17.5041C255.453 17.5041 259.512 18.3377 263.304 20.0023L263.308 20.0041C267.098 21.626 270.809 24.2115 274.439 27.7762Z" fill="#117DB0" stroke="white"/>
                            <path d="M39.8872 96.6988H40.3872V96.1988V20.6159H60.7197H61.2197V20.1159V3.22266V2.72266H60.7197H1H0.5V3.22266V20.1159V20.6159H1H21.2167V96.1988V96.6988H21.7167H39.8872Z" fill="#117DB0" stroke="#FAFAFA"/>
                            <path d="M104.983 96.1988V96.6988H105.483H155.365H155.865V96.1988V79.3056V78.8056H155.365H124.096V56.4981H155.365H155.865V55.9981V39.1049V38.6049H155.365H124.096V20.4888H155.365H155.865V19.9888V3.22266V2.72266H155.365H105.483H104.983V3.22266V96.1988Z" fill="#117DB0" stroke="white"/>
                        </svg>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser