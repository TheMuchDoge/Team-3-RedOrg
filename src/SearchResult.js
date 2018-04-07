import React from "react";

class SearchResult extends React.Component {
  render() {
    let brukere = JSON.parse(localStorage.getItem("searchResults"));
    if (!brukere) {
      return (
        <div>
          <h1>SearchResults: </h1>
          <p>Fant ikke noe personer</p>
        </div>
      );
    } else {
      let brukerListe = [];
      for (let bruker of brukere) {
        brukerListe.push(
          <li key={bruker.brukerID}>
            {bruker.fornavn}, {bruker.etternavn}, {bruker.epost}
          </li>
        );
      }

      return (
        <div>
          <h1>SearchResults: </h1>
          <ul>{brukerListe}</ul>
        </div>
      );
    }
  }
}

export default SearchResult;
