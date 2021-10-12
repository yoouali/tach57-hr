import {useState, useEffect, useCallback} from 'react';
import { Redirect, useParams  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';



function EntrepreneurComp(){
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
     
    if(!isLoading2 && !isLoading && entrepreneur)
    {
        console.log("set variables")
        var entrepreneurBox = null;
        if(entrepreneur.Active === 1)
            entrepreneurBox = <div id="stageFineshd" className="stageStatus"><p> Active </p><p> &#10003;</p></div>
        if(entrepreneur.Active === 0)
            entrepreneurBox = <div id="stageNotActive" className="stageStatus"><p>Not Active</p><p> &#10007;</p></div>
        var entrepreneurActive = null
        if (entrepreneur.Active === 0)
            entrepreneurActive = <div id="boxActiveEntrepreneur" className="stageButton"><button value={entrepreneurBox} onClick={({ target }) =>activeEntrepreneur(target.value)} id="entrepreneurActive">Active</button></div>
        if (entrepreneur.Active === 1)
            entrepreneurActive = null;
        console.log(entrepreneur);
    }

    function activeEntrepreneur(e){
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/auto-entrepreneur/active/" + entrepreneur.id;
        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{
                document.getElementById("boxActiveEntrepreneur").style.display="none";
                document.getElementById("stageNotActive").style.backgroundColor="#11B03E";
                document.getElementById("stageNotActive").innerText="";
                document.getElementById("stageNotActive").innerText="<p> Active </p><p> &#10003;</p>";
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
                <div className="stageBar">
                    <div className="stageTitle">Ouali Youssef</div>
                    <div className="stageInfo">
                        <div className="leftInfo">
                            {entrepreneurBox}
                            {entrepreneurActive}
                            <div className="stageButton"><button>Edit</button></div>
                            <div className="stageButton"><button id="stageButtonRemove">Remove</button></div>
                        </div>
                        <div className="rightInfo">
                            <div className="perInfo">
                            <div className="perInfoTitle"><p>Perssonelle Information <span>&#128396;</span></p><hr id="epi"></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">naem</div>
                                    <div className="infoValue">Ouali Youssef</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Email</div>
                                    <div className="infoValue">Youssef</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">TEL</div>
                                    <div className="infoValue">Youssef</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">CIN</div>
                                    <div className="infoValue">Youssef</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Birtday</div>
                                    <div className="infoValue">1998-10-11</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Birtpalce</div>
                                    <div className="infoValue">lamhra</div>
                                </div>
                            </div>
                            </div>
                            <div className="perInfo">
                            <div className="perInfoTitle"><p>CARTE D'ENTREPRENEUR <span>&#128396;</span></p><hr id="epi"></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">N°dinscription au reistre national*</div>
                                    <div className="infoValue">123456789</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Date D'adhesion*</div>
                                    <div className="infoValue">1-1-1</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Valable Jusqu'au*</div>
                                    <div className="infoValue">1-1-1</div>
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

export default EntrepreneurComp