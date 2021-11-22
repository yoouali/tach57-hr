import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

import './style.css';


function CallCenter(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
   

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);



    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}

    if (isLoading) {
            return <div className="App">Loading...</div>;
    }

    return(
        <div className="box">
            <Header user={user}/>
            <div className="homeContainer">
                <SideBar user={user}/>
                <div className="dashborde">
                    <div className="callCenterlist">
                        <div className="callCenterNavBar">
                            <div className="callCenterNavBarTitle">Call Center</div>
                            <div className="callCenterNavBarItemes">
                                <div className="callCenterNavBarIteme">calls</div>
                                <div className="callCenterNavBarIteme">contacts</div>
                            </div>
                        </div>
                        <div className="callsList">
                            <div className="callsListHeader">
                                <div><p>contact</p></div>
                                <div>client</div>
                                <div>Date</div>
                                <div>sttaf</div>
                            </div>
                            <div className="callsListItem"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallCenter