import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import axios from "axios";
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Calls from '../../components/Calls';
import Contacts from '../../components/Contacts';

import './style.css';

function CallCenter(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [Bar, setBar] = useState(<Calls />);
   

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);
    function changeBar(e){
        if (e === "callCenterBarCalls"){
            document.getElementById(e).style.fontWeight = "bold";
            document.getElementById("callsCenterBarContacts").style.fontWeight = "500";
            setBar(<Calls/>)
        }
        if (e === "callsCenterBarContacts"){
            document.getElementById(e).style.fontWeight = "bold";
            document.getElementById("callCenterBarCalls").style.fontWeight = "500";
            setBar(<Contacts />)
        }
    }
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
                                <div onClick={({target})=>changeBar(target.id)} id="callCenterBarCalls" className="callCenterNavBarIteme" >calls</div>
                                 <div onClick={({target})=>changeBar(target.id)} id="callsCenterBarContacts" className="callCenterNavBarIteme" >contacts</div>
                            </div>
                        </div>
                        {Bar}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallCenter