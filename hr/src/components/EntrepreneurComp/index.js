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
            entrepreneurBox = <div id="stageNotActive" className="stageStatus"><p id="boxentrepreneuractive1">Not Active</p><p id="boxentrepreneuractive2"> &#10007;</p></div>
        var entrepreneurActive = null
        if (entrepreneur.Active === 0)
            entrepreneurActive = <div id="boxActiveEntrepreneur" className="stageButton"><button value={entrepreneurBox} onClick={({ target }) =>activeEntrepreneur(target.value)} id="entrepreneurActive">Active</button></div>
        if (entrepreneur.Active === 1)
            entrepreneurActive = null;
        console.log(entrepreneur);
    }

    function testRemove(e){
        console.log("hh");
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
        })
    }
    function activeEntrepreneur(e){
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/auto-entrepreneur/active/" + entrepreneur.id;
        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{
                document.getElementById("boxActiveEntrepreneur").style.display="none";
                document.getElementById("stageNotActive").style.backgroundColor="#11B03E";
                document.getElementById("boxentrepreneuractive1").innerText="Active";
                document.getElementById("boxentrepreneuractive2").innerText="✓";
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
                        <li>Profile</li>
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
                    <div className="stageTitle">{entrepreneur.Nom} {entrepreneur.Prenom}</div>
                    <div className="stageInfo">
                        <div className="leftInfo">
                            {entrepreneurBox}
                            {entrepreneurActive}
                            <div className="stageButton"><Link to={"/Entrepreneurupdate/"+entrepreneur.id}><button>Edit</button></Link></div>
                            <div className="stageButton"><button onClick={testRemove} id="stageButtonRemove">Remove</button></div>
                        </div>
                        <div className="rightInfo">
                            <div className="perInfo">
                            <div className="perInfoTitle"><p>Perssonelle Information <span>&#128396;</span></p><hr id="epi"></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">name</div>
                                    <div className="infoValue">{entrepreneur.Nom} {entrepreneur.Prenom}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Email</div>
                                    <div className="infoValue">{entrepreneur.Email}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">TEL</div>
                                    <div className="infoValue">{entrepreneur.TEL}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">CIN</div>
                                    <div className="infoValue">{entrepreneur.CIN}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Date de naissance</div>
                                    <div className="infoValue">{entrepreneur.DateDeNaissance}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Lieu de naissance</div>
                                    <div className="infoValue">{entrepreneur.LieuDeNaissance}</div>
                                </div>
                            </div>
                            </div>
                            <div className="perInfo">
                            <div className="perInfoTitle"><p>CARTE D'ENTREPRENEUR <span>&#128396;</span></p><hr id="epi"></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">N°dinscription au reistre national*</div>
                                    <div className="infoValue">{entrepreneur.Identifiant}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Date d'adhesion</div>
                                    <div className="infoValue">{entrepreneur.DateDadhesion}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Valable Jusqu'au</div>
                                    <div className="infoValue">{entrepreneur.ValableJusquau}</div>
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