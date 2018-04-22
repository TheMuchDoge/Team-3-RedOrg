import React from "react";
import { NavLink } from "react-router-dom";
import { Glyphicon, Grid, Row, Col, Table, ListGroupItem} from "react-bootstrap"

class SearchResult extends React.Component {
  render() {
      // Henter resultatet fra localStorage.
    let brukere = JSON.parse(localStorage.getItem("searchResults"));

    // Når det finnes noe å brukere så itterer og skriver ut en listGroupItem.
    if (brukere) {
        let brukerListe = [];
        for (let bruker of brukere) {
            brukerListe.push(
                <ListGroupItem key={bruker.brukerID}>
                    <NavLink  exact to={"/profile/" + bruker.brukerID}>{bruker.fornavn} {bruker.etternavn}</NavLink>, {bruker.epost} | {bruker.poeng}
                </ListGroupItem>
            );
        }
        return (
            <div>
                <h1>SearchResults: </h1>
                <ul>{brukerListe}</ul>
            </div>
        );
    }
    // Hvis ikke så skriv det.
    else {
        return (
            <div>
                <h1>SearchResults: </h1>
                <p>Fant ikke noe søket ditt. </p>
            </div>
        )
    }
  }
}

export default SearchResult;
