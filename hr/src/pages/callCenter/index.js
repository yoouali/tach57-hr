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
                            <div className="callCenterNavBarItem">Calls</div>
                            <div className="callCenterNavBarItem">Contacts</div>
                        </div>
                        {/* <div className="listHeader">
                            <div>
                                <form className="serchBar">
                                    <div className="serchInput">
                                        <input type="text"  placeholder="serch" className="Serch"/>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallCenter