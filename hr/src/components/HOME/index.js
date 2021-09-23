import axios from "axios";
import {useState, useContext, useEffect} from 'react';
import { Redirect  } from "react-router";
import './style.css';

function Home(){
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(); 
    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {header:{'Authorization': 'Bearer ' + token}};
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
        <div>
            <section>
                <div className="header">
                    <div className="logo">jdfhdskhf</div>
                    <div className="user">
                        <span>{user.role}</span>
                        <ul className="user-nav">
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