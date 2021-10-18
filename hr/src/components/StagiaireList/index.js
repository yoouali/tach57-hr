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


function StagiaireList(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [stagiaireList, setStagiaireList] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get('https://stagiaire.herokuapp.com/api/stagiaire', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setStagiaireList(res.data.data);
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

      if(stagiaireList !== undefined){
        var namelist = stagiaireList.map(function(name){
             return(
            <div key={name.id} className="item">
            <div className="itemTitle"><p>{name.SujetDeStage}</p></div>
            <div className="itemOwner"><p>{name.Nom}</p><p>{name.Prenom}</p></div>
            <div className="itemDate"><p>25-08-2021</p><p>25-02-2021</p></div>
            {/* <p className="itemProp">spactate</p> */}
            <Link to={"/Stagiaire/"+name.id}  > <p className="itemProp">spactate</p></Link>
            </div>
          )
      })}

      const [serch, setSerch] = useState();
      function handleSerch(e) {
          e.preventDefault();
          const token = localStorage.getItem('token');
          if (serch === undefined || serch === "")
              return;
          axios.get('https://stagiaire.herokuapp.com/api/stagiaire/'+serch, {headers: {"Authorization": `Bearer ${token}`}})
          .then(res =>{;
              setStagiaireList(res.data);
          })
          .catch(err => {console.log(err)})
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
                <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
                <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
                <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
                </div>
                <div className="dashborde">
                    <div className="list">
                        <div className="listHeader">
                            <div >
                                <form className="serchBar" onSubmit={handleSerch}>
                                    <div className="serchInput">
                                        <input type="text"  placeholder="serch" className="Serch"
                                        onChange={({ target }) => setSerch(target.value)}
                                        />
                                    </div>
                                    <button className="serchButton">Serch</button>
                                </form>
                            </div>
                            <div className="Filter">
                                <div className="filterTitle">Filters : </div>
                                <div className="filterOptions">
                                    <p>New</p>
                                    <p>Fineshd</p>
                                    <p>On progrese</p>
                                </div>
                            </div>
                        </div>
                        {namelist}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StagiaireList