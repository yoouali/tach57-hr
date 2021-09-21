import axios from "axios";
import { Redirect  } from "react-router";

function Home(){
    const config = {header:{Authorization: 'Bearer' + localStorage.getItem('token')}};
    axios.get('https://stagiaire.herokuapp.com/api', config).then(res =>{console.log(res);},err => {console.log(err)})

    const isLogged = localStorage.getItem('token');
    if (!isLogged) {
        return (
            <Redirect to="/login" />
        )
    }
    return(
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home