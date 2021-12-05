import {useState, useEffect} from 'react';
import { Redirect, useParams  } from "react-router";
import axios from "axios";
import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';
import './style.css';
import phoneIcon from '../../../images/icons/phoneIcon.png';
import clockIcon from '../../../images/icons/clockIcon.png';


function Contact(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [contact, setContact] = useState();
   
    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/Client/show/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setContact(res.data);
            setLoading2(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}

    if (isLoading || isLoading2) {
            return <div className="App">Loading...</div>;
    }

    return(
        <div className="box">
            <Header user={user}/>
            <div className="homeContainer">
                <SideBar user={user}/>
                    <div className="dashborde">
                        <div className="ContactBorde">
                        {/* {isLoading2 === true ? <div className="ContactBordLoading">loading ...</div>: */}
                        <div className="ContactCard">
                            <div className="ContactCardHeader">
                                <div className="ContactCardHeaderBack"></div>
                                <div className="ContactCardHeaderProp">
                                    <div className="ContactCardHeaderEdit"></div>
                                    <div className="ContactCardHeaderRemove"></div>
                                </div>
                            </div>
                            <div className="ContactInfo">
                                <div className="ContactPerss">
                                    <div className="ContactPerssGroupe">
                                        <div className="ContactPerssGroupTitle">Client</div>
                                        <div className="ContactPerssGroupData">OUALI YOUSSEF</div>
                                    </div>
                                    <div className="ContactPerssGroupe">
                                        <div className="ContactPerssGroupTitle">Phone Number</div>
                                        <div className="ContactPerssGroupData">0777672016</div>
                                    </div>
                                    <div className="ContactPerssGroupe">
                                        <div className="ContactPerssGroupTitle">Societ</div>
                                        <div className="ContactPerssGroupData">My Kids</div>
                                    </div>
                                </div>
                                <div className="ContactCount">
                                    <div className="ContactCountGroupe">
                                        <div className="ContactCountGroupIcon"><img src={phoneIcon} alt="phoneIcon"/></div>
                                        <div className="ContactCountGroupInfo">
                                            <div className="ContactCountInfoData">250</div>
                                            <div className="ContactCountInfoTitle">Total D'appels</div>
                                        </div>
                                    </div>
                                    <div className="ContactCountGroupe">
                                        <div className="ContactCountGroupIcon"><img src={clockIcon} alt="clockIcon"/></div>
                                        <div className="ContactCountGroupInfo">
                                            <div className="ContactCountInfoData">100h 59min</div>
                                            <div className="ContactCountInfoTitle">Duree D'appels</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ContactHist">
                                <div className="ContactHistHeader">
                                    <div className="ContactHistTitle">History</div>
                                    <div className="ContactHistSort">
                                        <div className="ContactHistSortTitle"></div>
                                        <div className="ContactHistSortItems">
                                            <div className="ContactHistSortItem"></div>
                                            <div className="ContactHistSortItem"></div>
                                            <div className="ContactHistSortItem"></div>
                                            <div className="ContactHistSortItem"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ContactHistList"></div>
                            </div>
                        </div>
                        {/* } */}
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default Contact