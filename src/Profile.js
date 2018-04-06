import React from "react";
import {NavLink} from 'react-router-dom';
import {queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Profile extends React.Component  {
    render () {
        let bruker = queries.brukerLoggetInn();

        return (
            <div>
                <h1>Profile</h1>
                <ul>
                    <li>Navn: {bruker.fornavn} {bruker.etternavn}</li>
                    <li>Epost: {bruker.epost}</li>
                    <li>Telefon: {bruker.tlf}</li>
                    <li>Adresse: {bruker.adresse}</li>

                </ul>
                <NavLink activeStyle={{color: 'green'}} to={'/profileUpdate/' + bruker.brukerID}>Rediger</NavLink>{' '}
            </div>
        )
    }



}

export default Profile;
