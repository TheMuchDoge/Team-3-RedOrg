import React from "react";
import { eventQueries, queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
// Henter external fil som har maler for events og roller.
import {eventMaler} from "./rollerOgEventMal.js"
import {Button, Glypicon} from "react-bootstrap"

class newEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // For hver av elementene i eventmal så skriver det ut valget for å velge det som eventtype.
      let eventList = [];
      for (let x in eventMaler) {
          eventList.push(
              <option key={eventMaler[x].key} value={eventMaler[x].key}>{eventMaler[x].navn}</option>
          )
      }

      // Enkel sing inn inputs, bruker ref for å hente verdier.
    return (
      <div className="LoginDiv">
          <table>
              <tbody>
              <tr>
                  <h3>Opprett et arrangement:</h3>
              </tr>
                  <tr>
                      <td><b>Navn:</b></td>
                      <td><input type="text" ref="navnSign" /></td>
                  </tr>
                  <tr>
                      <td><b>Lokasjon:</b></td>
                      <td><input type="text" ref="lokasjonSign" /></td>
                  </tr>
                  <tr>
                      <td><b>Start Dato:</b></td>
                      <td><input type="date" ref="datoStartSign" /></td>
                  </tr>
                  <tr>
                      <td><b>Slutt Dato:</b></td>
                      <td><input type="date" ref="datoSluttSign" /></td>
                  </tr>
                  <tr>
                      <td><b>Type arrangment:</b></td>
                      <td><select ref="eventKey" >{eventList}</select></td>
                  </tr>
                  <tr>
                      <td><b>Annen Informasjon:</b></td>
                      <td><textarea rows="4" cols="25" type="textbox" ref="infoSign" /></td>
                  </tr>
              </tbody>
          </table>
          <Button id="makeEvent">Lag</Button>
      </div>
    )
  }

  componentDidMount() {
      // Henter knappen, siden vi bruker Bootstrap så fungere ikke ref på de elementene.
      let x = document.getElementById("makeEvent");

      // Lager et object for enkelere henting av data i spørringen.
      // Og enkel validasjon som bare sjekker om alt er fylt ut. og tilslutt sender det til databasen og pusher brukeren til Kalender.
    x.onclick = () => {
      let nyttEvent = {
        Navn: this.refs.navnSign.value,
        Lokasjon: this.refs.lokasjonSign.value,
        dato_start: this.refs.datoStartSign.value,
        dato_slutt: this.refs.datoSluttSign.value,
        annen_info: this.refs.infoSign.value,
        eventKey: this.refs.eventKey.value
      };
      if (nyttEvent.Navn === "" || nyttEvent.Lokasjon=== ""|| nyttEvent.dato_slutt=== ""||nyttEvent.dato_start=== ""||nyttEvent.annen_info=== "") {
          alert("Vennligst fyll inn alt.")
      }
      else {
          eventQueries.createNewEvent(nyttEvent).then(() => {
              this.refs.navnSign.value = "";
              this.refs.lokasjonSign.value = "";
              this.refs.datoStartSign.value = "";
              this.refs.datoSluttSign.value = "";
              this.refs.infoSign.value = "";
              history.push("/kalender");
          });
      }
    };
  }
}

export default newEvent;
