import {Link} from 'react-router-dom'

function Header()
{
    return(
        <div>
            <h1>Header</h1>
            <Link to="/login">Login</Link>
            <Link to="/home">Tech-57</Link>
            <Link to="liststagaire">Stagaire</Link>
        </div>
    )
}
export default Header