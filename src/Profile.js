import React from "react";
import {queries} from "./services";

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
                    <li>Address: {bruker.address}</li>

                </ul>
            </div>
        )
    }



}

export default Profile;
