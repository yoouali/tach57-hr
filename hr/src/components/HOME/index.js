import { Redirect  } from "react-router";

function Home(){
    // const isLogged = !!sessionStorage.getItem('token_object');
    // if (!isLogged) {
    //     return (
    //         <Redirect to="/login" />
    //     )
    // }
    return(
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home