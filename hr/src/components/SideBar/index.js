import { Link } from "react-router-dom";
import profileIcon from '../../images/icons/person.png';
import entrepreneurIcon from '../../images/icons/entrepreneur.png';
import stagiaireIcon from '../../images/icons/stagiaire.png';
import freelancerIcon from '../../images/icons/freelancer.png';


function SideBar(){
    return (
        <div className="sideBar">
            <Link to="/"> <div><img src={profileIcon} alt="profileicon" /></div> </Link>
            <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>
            <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
            <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
            <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
            <Link to="/CallCenterList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
        </div>
    )
}

export default SideBar