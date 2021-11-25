import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import axios from "axios";
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Calls from '../../components/Calls';

import './style.css';
import outgoingCall from '../../images/icons/outgoingcall.png';

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
    var Bar = <Calls/>
    function changeBar(e){
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
                                <div id="callCenterBarCalls" className="callCenterNavBarIteme" >calls</div>
                                <div id="callsCenterBarContacts" className="callCenterNavBarIteme" >contacts</div>
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