import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'

function Entrepreneur(){
    const [isLoading, setLoading] = useState(true);
    const [entrepreneur, setEntrepreneur] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/auto-entrepreneur/notActive', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            setEntrepreneur(res.data.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    function entrepreneurActive(e){
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/auto-entrepreneur/active/" + e;
        console.log(url);

        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{console.log(res);
            removeItem(e);
        })
         .catch(err => {console.log(err)})
    }

    function removeItem(e){
        const id = Number(e);
        const newPeople = entrepreneur.filter(function(item){
            return item.id !== id
        });
        setEntrepreneur(newPeople);
    }

    function updatehola(){
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    
        var namesList = entrepreneur.map(function(name){
            if (name.Active === 0)
            return (<div key={name.id} className="entrepreneurItem"><div className="operationTitle"><p>{name.Nom}</p><p>{name.Prenom}</p></div><div className="operationButton"><button value={name.id} onClick={({ target }) =>entrepreneurActive(target.value)} className="active">Active</button><button className="remove">Remove</button></div></div>);
            else
                return (<div></div>);
        })


    return(
        <div className="entrepreneurContainer">
            <div className="entrepreneurHeader">
                <p>ENTREPRENEUR</p>
                <div className="entrepreneurOperation">
                    <div>All</div>
                    <div onClick={updatehola}>Refresh</div>
                </div>
            </div>
            <div className="entrepreneurList">
                {namesList}
            </div>
            <div>
            </div>
        </div>
    )
}

export default Entrepreneur