import axios from "axios";
import { Redirect  } from "react-router";
import './style.css';

function Home(){
    const token = localStorage.getItem('token');
    const config = {header:{'Authorization': 'Bearer ' + token}};
    console.log(config)
    axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
    .then(res =>{console.log(res);})
    .catch(err => {console.log("sadsfdsf");console.log(err)})

    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
    return(
        <div>
            <section>
                <div className="header">
                    <div className="logo"></div>
                    <div className="user"></div>
                </div>
            </section>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home