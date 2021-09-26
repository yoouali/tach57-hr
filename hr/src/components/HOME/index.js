import axios from "axios";
import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import './style.css';

function Home(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [entrepreneur, setEntrepreneur] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {header:{'Authorization': 'Bearer ' + token}};

        axios.get('https://stagiaire.herokuapp.com/api/auto-entrepreneur/notActive', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setEntrepreneur(res.data);
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
          if(targetEl == flyoutEl) {
            // This is a click inside, does nothing, just return.
           console.log("click inside");
            return;
          }
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (document.getElementById("userNav").style.display === "block")
            document.getElementById("userNav").style.display = "none";
      });

    
    console.log("entrepreneur :");
    console.log(entrepreneur);
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}

    if (isLoading) {
            return <div className="App">Loading...</div>;
    }

    return(
        <div>
            <section>
                <div className="header">
                    <div className="logo">jdfhdskhf</div>
                    <div id="user" className="user">
                        <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.role}</span></div>
                        <ul id="userNav" className="user-nav">
                            <li>Setting</li>
                            <li>logout</li>
                        </ul>
                    </div>
                </div>
            </section>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home