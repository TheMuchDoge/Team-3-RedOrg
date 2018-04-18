import React from "react";
import { NavLink } from "react-router-dom";

class SearchResult extends React.Component {
  render() {
    let brukere = JSON.parse(localStorage.getItem("searchResults"));

    if (brukere) {
        let brukerListe = [];
        console.log(brukerListe)
        for (let bruker of brukere) {
            brukerListe.push(
                <li key={bruker.brukerID}>
                    <NavLink  exact to={"/profile/" + bruker.brukerID}>{bruker.fornavn} {bruker.etternavn}</NavLink>, {bruker.epost} | {bruker.poeng}
                </li>
            );
        }
        return (
            <div>
                <h1>SearchResults: </h1>
                <ul>{brukerListe}</ul>
            </div>
        );
    } else {
        return (
            <div>
                <h1>SearchResults: </h1>
                <p>Fant ikke noe personer</p>
            </div>
        );
    }
  }
}

export default SearchResult;
