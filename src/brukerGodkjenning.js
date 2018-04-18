import React from "react";
import { eventQueries, queries } from "./services";
import { NavLink } from "react-router-dom";

class BrukerGodkjenning extends React.Component {
  constructor(props) {
    super(props);

    this.brukere = [];
  }

  render() {
    let arrayBrukere = [];
    for (let i of this.brukere) {
      arrayBrukere.push(
        <tr key={i.brukerID}>
            <td>
                <NavLink activestyle={{ color: "green" }} to={"/profile/" + i.brukerID}>{i.fornavn} {i.etternavn}</NavLink>{" "}
            </td>

            <td>
              <button
                onClick={() => {
                  eventQueries.godkjenning(i.brukerID, "bruker", true).then(() => {
                    this.brukere.splice(this.brukere.indexOf(i), 1);
                    this.forceUpdate();
                  });
                }}
              >
                v
              </button>
              <button
                onClick={() => {
                  eventQueries.godkjenning(i.brukerID, "bruker", false).then(() => {
                    this.brukere.splice(this.brukere.indexOf(i), 1);
                    this.forceUpdate();
                  });
                }}
              >
                x
              </button>
            </td>
        </tr>
      );
    }

    return (
      <div>
        <h1>Bruker godkjenning:</h1>
        <table>
            <tbody>
                {arrayBrukere}
            </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    queries.hentIkkeGodkjenteBrukere().then((result) => {
      this.brukere = result;
      this.forceUpdate();
    });
  }
}

export default BrukerGodkjenning;
