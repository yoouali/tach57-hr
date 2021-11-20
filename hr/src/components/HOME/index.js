import {useState, useEffect} from 'react';
import { Redirect  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import Entrepreneur from '../entrepreneur';
import Stagiaire from "../stagiaire";
import Freelancer from '../freelancer';
import Header from '../Header';
import SideBar from '../SideBar';

import './style.css';

import logo from './logo.png';
import profileIcon from '../../images/icons/person.png';
import entrepreneurIcon from '../../images/icons/entrepreneur.png';
import stagiaireIcon from '../../images/icons/stagiaire.png';
import freelancerIcon from '../../images/icons/freelancer.png';




function Home(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
   

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {
            localStorage.removeItem("token");
            console.log(err)})
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
                    <Stagiaire />
                    <Entrepreneur />
                    <Freelancer />
                </div>
            </div>
        </div>
    )
}

export default Home