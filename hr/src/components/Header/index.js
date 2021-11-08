import { Link } from "react-router-dom";
import logo from '../../images/logo.png';


function Header({user}){


    function handelUserNav(){
        let element = document.getElementById("userNav");
        if (element.style.display === "none")
            element.style.display="block";
        else
            element.style.display="none";
    }
    document.addEventListener("click", function(evt) {
        let flyoutEl = document.getElementById('user'),
          targetEl = evt.target; // clicked element      
        do {
          if(targetEl === flyoutEl) {
            // This is a click inside, does nothing, just return.
           console.log("click inside");
            return;
          }
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (document.getElementById("userNav") && document.getElementById("userNav").style.display === "block")
            document.getElementById("userNav").style.display = "none";
      });
    var addSttaf = null;
    if (user.Role === "admin")
        addSttaf = <Link to="/AddUser"><li>New Staff</li></Link>



    return(
        <section>
        <div className="header">
            <div className="logo"><img src={logo} alt="teck-57-log"/></div>
            <div id="user" className="user">
                <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.Role}</span></div>
                <ul id="userNav" className="user-nav">
                    {addSttaf}
                    <Link to="../Setting">
                    <li>Setting</li></Link>
                    <Link to="/login"><li  onClick={function(){localStorage.removeItem("token")}} className="logout">logout</li></Link>
                </ul>
            </div>
        </div>
    </section>
    )
}
export default Header