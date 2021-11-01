import {useState, useEffect} from 'react';
import { Redirect, useParams  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';

function UserComp(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [userComp, setUserComp] = useState();


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/user/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res);
            setUserComp(res.data);
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

    
    if (!isLoading && !isLoading2 && userComp)
    {
        var userBox = null;
        var userStatus = null;
        if (userComp.Active === 1){
            userBox = <div id="stageFineshd" className="stageStatus"><p> {userComp.Role} </p><p> &#10003;</p></div>;
            userStatus = <div className="stageButton"><button  onClick={userStatusChange}>d'active</button></div>;}
        else{
            userBox = <div id="userDeactive" className="stageStatus"><p> {userComp.Role} </p><p> &#10003;</p></div>;
            userStatus = <div className="stageButton"><button>active</button></div>;}
    }
    
    function userRemove(){
        console.log("hh");
    }
    function userStatusChange(){
        const data= {Active: 0,}
        const token = localStorage.getItem('token');
        axios.post('https://stagiaire.herokuapp.com/api/user/active/' + id, data,{headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res)
            console.log("hh");
        })
        .catch(err => {console.log(err)})
    }
    
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
  
    if (isLoading || isLoading2) {
              return <div className="App">Loading...</div>;
    }
    return (
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
                <div className="stageBar">
                    <div className="stageTitle">{userComp.Nom} {userComp.Prenom}</div>
                    <div className="stageInfo">
                        <div className="leftInfo">
                            {userBox}                            
                            {userStatus}
                            <div className="stageButton"><button onClick={userRemove} id="stageButtonRemove">Remove</button></div>
                        </div>
                        <div className="rightInfo">
                            <div className="perInfo">
                            <div className="perInfoTitle"><p>Perssonelle Information <span>&#128396;</span></p><hr id="epi"></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">Prenom</div>
                                    <div className="infoValue">{userComp.Prenom}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Nom</div>
                                    <div className="infoValue">{userComp.Nom}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Email</div>
                                    <div className="infoValue">{userComp.Email}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">TEL</div>
                                    <div className="infoValue">{userComp.TEL}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">CIN</div>
                                    <div className="infoValue">{userComp.CIN}</div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserComp