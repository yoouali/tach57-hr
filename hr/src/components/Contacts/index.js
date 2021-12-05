import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
            return (<Link key={item.id} to={"/Contact/" + item.id}  style={{ textDecoration: 'none' }}> <div  className="contactsListItem">
                        {/* <div className="contactsListItemOperation">
                            <div id="contactListOperationEdit" className="contactsListItemOperationEdit">...</div>
                            <div id="contactListOperationDelete" className="contactsListItemOperationRemove">&#10007;</div>
                        </div> */}
                        <div className="contactsListItemName"><p>&#128100;</p>{item.Nom} {item.Prenom}</div>
                        <div className="contactsListItemNumber"><p>&#128241;</p>{item.TEL}</div>
                        <div className="contactsListItemDetails">
                            <div className="contactsListItemDetailsCalls"><p>&#128222;</p>{item.CallCount}</div>
                            <div className="contactsListItemDetailsTime"><p>&#128336;</p>{time}</div>
                        </div>
                    </div> </Link>)
        })
    }
    var loading = <div className="ContactsLoading">
                    <svg width="373" height="500" viewBox="0 0 373 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M108 66.5V27C108 15.9543 116.954 7 128 7H247C258.046 7 267 15.9543 267 27V66.5M108 66.5H27C15.9543 66.5 7 75.4543 7 86.5V179M108 66.5H267M267 66.5H346C357.046 66.5 366 75.4543 366 86.5V179M366 179V339.5C366 350.546 357.046 359.5 346 359.5H267M366 179L351.884 201.41C348.222 207.223 341.832 210.75 334.961 210.75H213M267 359.5V333.5M267 359.5V433.5C267 439.023 262.523 443.5 257 443.5H136C130.477 443.5 126 439.023 126 433.5V359.5M267 333.5L297.509 315.899C301.046 313.858 300.778 308.668 297.049 307.002L204.992 265.889C203.722 265.322 202.273 265.31 200.993 265.855L104.541 306.936C100.689 308.577 100.439 313.942 104.122 315.934L126 327.768M267 333.5L193.403 366.425C191.899 367.098 190.16 366.986 188.754 366.127L126 327.768M126 327.768V359.5M126 359.5H27C15.9543 359.5 7 350.546 7 339.5V179M213 210.75V174.583C213 166.464 206.539 159.818 198.422 159.589L192.922 159.434C184.476 159.197 177.5 165.979 177.5 174.428V210.75M213 210.75V238.5C213 240.709 211.209 242.5 209 242.5H181.5C179.291 242.5 177.5 240.709 177.5 238.5V210.75M177.5 210.75H39.1108C32.475 210.75 26.2712 207.459 22.5505 201.964L7 179M203 311L145.341 357.999C144.176 358.949 143.5 360.372 143.5 361.875V467.5M143.5 467.5L111.5 494.5M143.5 467.5V490.5M143.5 467.5L172 494.5" stroke="white" strokeWidth="13" className="svg-elem-1"></path>
                    </svg></div>

                    
    return(
    <div className="contacts">
    <div className="contactsHeader">
        <form className="contactsSerch">
            <input type="text" className="contactsInputSerch" placeholder="Serch"/>
            <button className="contactsButton">Serch</button>
        </form>
    </div>
    <div  className="contactsList">
        {isLoading !== false ? loading : namesList}
    </div>
    </div>
    )
}

export default Contacts