import React from "react";


class SearchResult extends React.Component {
    render() {
        let brukere = JSON.parse(localStorage.getItem('searchResults'));
        if (!brukere) {
            localStorage.removeItem('searchResults');
            return (
                <div>
                    <h1>SearchResults: </h1>
                    <p>Fant ikke noe personer</p>
                </div>
            )
        }
        else {
            let brukerListe = [];
            for (let bruker of brukere) {
                brukerListe.push(
                    <li key={bruker.personID}>{bruker.fornavn} {bruker.etternavn}, {bruker.epost}</li>
                )
            }
            localStorage.removeItem('searchResults');
            return (
                <div>
                    <h1>SearchResults: </h1>
                    <ul>{brukerListe}</ul>
                </div>
            )

        }

    }


    componentDidMount () {

    }
}

export default SearchResult;