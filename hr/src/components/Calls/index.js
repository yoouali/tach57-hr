import outgoingCall from '../../images/icons/outgoingCall.png';
import { Link } from "react-router-dom";


function Calls(){
    return (
    <div className="calls">
    <div className="callsHeader">
    </div>
    <div className="callsList">
        <div className="callsListHeader">
            <div className="callsListContact">contact</div>
            <div className="callsListDate">Date</div>
            <div className="callsListTime">Time</div>
            <div className="callsListClient">client</div>
            <div className="callsListStaff">sttaf</div>
        </div>
        <Link to={"/Call/1"}>
        <div className="callsListItem">
            <div className="callsListItemContact">
                <div className="callsTypeIcon">
                    <div className="callTypeIconText">outgoing call</div>
                    <img className="test"  src={outgoingCall} alt="profileicon"/>
                </div>
                <div className="callsContact">+212 777672016</div>
            </div>
            <div className="callsListDate">2021 - 11 - 25</div>
            <div className="callsListTime">14.25 min</div>
            <div className="callsListClient">youssef ouali</div>
            <div className="callsListStaff">youssef ouali</div>
        </div>
        </Link>
        <div className="callsListItem">
            <div className="callsListItemContact">
                <div className="callsTypeIcon">
                    <div className="callTypeIconText">outgoing call</div>
                    <img className="test"  src={outgoingCall} alt="profileicon"/>
                </div>
                <div className="callsContact">+212 777672016</div>
            </div>
            <div className="callsListDate">2021 - 11 - 25</div>
            <div className="callsListTime">14.25 min</div>
            <div className="callsListClient">- - - - - - - - -</div>
            <div className="callsListStaff">youssef ouali</div>
        </div>
    </div>
    </div>
    )
}

export default Calls