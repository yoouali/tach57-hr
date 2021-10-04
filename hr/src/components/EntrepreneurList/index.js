import axios from "axios";
import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import './style.css';
import logo from '../../images/logo.png';
import { Link } from "react-router-dom";

import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';


function EntrepreneurList(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [entrepreneurList, setEntrepreneurList] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get('https://stagiaire.herokuapp.com/api/auto-entrepreneur', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setEntrepreneurList(res.data.data);
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
      if(entrepreneurList !== undefined){
      console.log(entrepreneurList);
      var namelist = entrepreneurList.map(function(name){
          return(
            <div key={name.id} className="item">
            <div className="itemTitle"><p>{name.SujetDeStage}</p></div>
            <div className="itemOwner"><p>Ouali</p><p>Youssef</p></div>
            <div className="itemDate"><p>25-08-2021</p><p>25-02-2021</p></div>
            <p className="itemProp">spactate</p>
            </div>
          )
      })
      }

    if (isLoading) {return <div className="App">Loading...</div>;}
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
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
                <div><img src={entrepreneurIcon} alt="profileicon" /></div>
                <div><img src={freelancerIcon} alt="profileicon" /></div>
                </div>
                <div className="dashborde">
                    <div className="list">
                        <div className="ListHeader">
                            <div className="SerchBar"></div>
                            <div className="Filter"></div>
                        </div>
                        {namelist}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntrepreneurList