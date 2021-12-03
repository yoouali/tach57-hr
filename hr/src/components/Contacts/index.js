import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import outgoingCall from '../../images/icons/outgoingcall.png';


function Contacts(){

    const [isLoading, setLoading] = useState(true);
    const [contacts, setContacts] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://stagiaire.herokuapp.com/api/Client', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setContacts(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    function rightTime(e){
        if (e === 0)return 0;
        var min = parseInt(e / 60);
        if (min === 0)return(e + "s");
        if (min < 60 && (e - min * 60) !== 0) return(min + "."+(e-min*60)+"min")
        if (min < 60)return(min+"min");
        var h = parseInt(min / 60);
        if ((min - h * 60) !== 0)return (h + "h" + (min - h * 60) + "min")
        return(h + "h")
    }
    if (isLoading === false)
    {
        var namesList = contacts.map(function(item){
            var time = rightTime(item.DureeDappel);
            console.log(time);
            return (<Link key={item.id} to={"/"} style={{ textDecoration: 'none' }}> <div className="contactsListItem">
                        <div className="contactsListItemOperation">
                            <div id="contactListOperationEdit" className="contactsListItemOperationEdit">...</div>
                            <div id="contactListOperationDelete" className="contactsListItemOperationRemove">&#10007;</div>
                        </div>
                        <div className="contactsListItemName"><p>&#128100;</p>{item.Nom} {item.Prenom}</div>
                        <div className="contactsListItemNumber"><p>&#128241;</p>{item.TEL}</div>
                        <div className="contactsListItemDetails">
                            <div className="contactsListItemDetailsCalls"><p>&#128222;</p>{item.CallCount}</div>
                            <div className="contactsListItemDetailsTime"><p>&#128336;</p>{time}</div>
                        </div>
                    </div></Link>)
        })
    }

    if (isLoading === true)
        return (<div>Loading ...</div>)

    return(
    <div className="contacts">
    <div className="contactsHeader">
        <form className="contactsSerch">
            <input type="text" className="contactsInputSerch" placeholder="Serch"/>
            <button className="contactsButton">Serch</button>
        </form>
    </div>
    <div className="contactsList">
        {namesList}
    </div>
    </div>
    )
}

export default Contacts