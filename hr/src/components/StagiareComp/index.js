import {useState, useEffect, Component} from 'react';
import { Redirect, useParams  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';




function StagiaireComp(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [stage, setStage] = useState();
   

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/stagiaire/show/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res);
            setStage(res.data.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading2(false);
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

    if (isLoading || isLoading2) {
            return <div className="App">Loading...</div>;
    }
    if (!isLoading && !isLoading2 && stage)
    {     
        var Etablissement = null
        if (stage.Etablissement !== null)
            Etablissement = <div className="groupeInfo"><div className="infoTitle">Etablissement</div><div className="infoValue">{stage.Etablissement}</div></div>
        var Filiere = null
        if (stage.Filiere !== null)
            Filiere = <div className="groupeInfo"><div className="infoTitle">Filiere</div><div className="infoValue">{stage.Filiere}</div></div>
        var Niveau = null
        if (stage.Niveau !== null)
            Niveau = <div className="groupeInfo"><div className="infoTitle">Niveau</div><div className="infoValue">{stage.Niveau}</div></div>
    }
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
                <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
                <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
                <div><img src={freelancerIcon} alt="profileicon" /></div>
                </div>
                <div className="dashborde">
                <div className="stageBar">
                    <div className="stageTitle">{stage.SujetDeStage}</div>
                    <div className="stageInfo">
                        <div className="leftInfo">
                            <div className="stageStatus">
                                <p>Stage</p>
                                <p>is Over</p>
                            </div>
                            <p>CV</p>
                            <p>Convention</p>
                            <p>Assurance</p>
                            <p>Fiche du Stagiaire</p>
                        </div>
                        <div className="rightInfo">
                            <div className="stageDate">
                                <div className="dateInfo"><p>Start at 02-10-2021 &#9716;</p></div>
                                <div className="dateInfo"><p>Over at 02-10-2021 &#9719;</p></div>
                            </div>
                            <div className="perInfo">
                                <div className="perInfoTitle"><p>Descreption <span>&#128396;</span></p><hr id="Desc"></hr></div>
                                <div className="descInfo"><p>
                                This HTML file is a template. If you open it directly in the browser, you will see an empty page. You can add webfonts, meta tags, or analytics to this file. The build step will place the bundled scripts into the
                                    </p>
                                </div>
                            </div>
                            <div className="perInfo">
                                <div className="perInfoTitle"><p>Stagiaire Information <span>&#128396;</span></p><hr></hr></div>
                            <div className="perInfoData">

                                <div className="groupeInfo">
                                    <div className="infoTitle">name</div>
                                    <div className="infoValue">Youssef Ouali</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Email</div>
                                    <div className="infoValue">youssefouali!@gmail.com</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">CIN</div>
                                    <div className="infoValue">q2313213</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">TEL</div>
                                    <div className="infoValue">0777672016</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">birtplace</div>
                                    <div className="infoValue">lamhara taroudant</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">birtplace</div>
                                    <div className="infoValue">lamhara taroudant</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Type de Stage</div>
                                    <div className="infoValue">{stage.TypeDeStage}</div>
                                </div>
                                {Etablissement}
                                {Filiere}
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

export default StagiaireComp