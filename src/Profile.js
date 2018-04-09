import React from "react";
import {NavLink} from 'react-router-dom';
import {queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        this.id = props.match.params.brukerID;
        this.bruker = {};
    }
    render () {

        return (
            <div>
                <h1>Profile</h1>
                <ul>
                    <li>Navn: {this.bruker.fornavn} {this.bruker.etternavn}</li>
                    <li>Epost: {this.bruker.epost}</li>
                    <li>Telefon: {this.bruker.tlf}</li>
                    <li>Adresse: {this.bruker.adresse}</li>

                </ul>
                <NavLink activeStyle={{color: 'green'}} to={'/profileUpdate/' + this.bruker.brukerID}>Rediger</NavLink>{' '}
            </div>
        )
    }

    componentDidMount() {
        queries.hentBruker(this.id).then(result => {
            this.bruker = result[0];
            this.forceUpdate();
            });
        }



}

export default Profile;
