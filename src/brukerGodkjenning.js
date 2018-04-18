import React from "react";
import { eventQueries, queries } from "./services";
import { NavLink } from "react-router-dom";
import {Button,Glyphicon, Table} from "react-bootstrap"

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
                <NavLink  to={"/profile/" + i.brukerID} ><h3>{i.fornavn} {i.etternavn}</h3></NavLink>{" "}
            </td>
            <td>
              <Button style={{marginTop: 10+"px"}}bsStyle="success"
                onClick={() => {
                  eventQueries.godkjenning(i.brukerID, "bruker", true).then(() => {
                    this.brukere.splice(this.brukere.indexOf(i), 1);
                    this.forceUpdate();
                  });
                }}
              >
                  <Glyphicon glyph="ok"/>
              </Button>{" "}
              <Button style={{marginTop: 10+"px"}} bsStyle="danger"
                onClick={() => {
                  eventQueries.godkjenning(i.brukerID, "bruker", false).then(() => {
                    this.brukere.splice(this.brukere.indexOf(i), 1);
                    this.forceUpdate();
                  });
                }}
              >
                  <Glyphicon glyph="remove"/>
              </Button>
            </td>
        </tr>
      );
    }

    return (
      <div>
        <h1>Bruker godkjenning:</h1>
        <Table striped>
            <tbody>
                {arrayBrukere}
            </tbody>
        </Table>
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
