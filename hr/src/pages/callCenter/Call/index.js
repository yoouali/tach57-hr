import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';
import arrow from '../../../images/icons/arrowBack.png';
import edit from '../../../images/icons/edit.png';
import outgoingcall from '../../../images/icons/outgoingCall.png'
import '../style.css';

function Call(){
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
                    <div className="callBoard">
                        <div className="callHeader">
                        <div className="callBack"><img src={arrow}></img></div>
                        <div className="callBack"><img src={edit}></img></div>
                        </div>
                        <div className="Board">
                            <div className="callClient">Youssef Ouali</div>
                            <div className="call">
                                {/* <div className="callType"><img src={outgoingcall}/></div> */}
                                <div className="callContact"> <span> &#128241; </span> 0777672016</div>
                            </div>
                            <div className="callTime"></div>
                            <div className="callName"></div>
                            <div className="callDate"></div>
                            <div className="callsttaf"></div>
                            <div className="callDescription"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Call