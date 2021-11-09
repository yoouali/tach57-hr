import { Link } from "react-router-dom";
import profileIcon from '../../images/icons/person.png';
import entrepreneurIcon from '../../images/icons/entrepreneur.png';
import stagiaireIcon from '../../images/icons/stagiaire.png';
import freelancerIcon from '../../images/icons/freelancer.png';


function SideBar({user}){
    var userList = null;
    var callCenter = null;
    var entrepreneur = null;
    var stagiaire = null;
    var freelancer = null;
    var inactive = null;
    if (user.Role === "admin"){
        userList = <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>;
        callCenter = <Link to="/CallCenterList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
    }
    if (user.Role === "admin" || user.Role === "rh"){
        entrepreneur = <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>;
        stagiaire = <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>;
        freelancer = <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
    }
    if (user.Active === 1){
        inactive = <div className="sideBar"><Link to="/"> <div><img src={profileIcon} alt="profileicon" /></div> </Link>{userList}{entrepreneur}{stagiaire}{freelancer}{callCenter}</div>
    }
    if (user.Active === 0){
        inactive = <div className="sideBar"><div><img src={profileIcon} alt="profileicon" /></div></div>
    }
    
    return (
        <div>
        {inactive}
        </div>
    )
}

export default SideBar