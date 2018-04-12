import React from "react";
import { eventQueries, queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class newEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <table>
              <tbody>
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
                      <td><b>Annen Informasjon:</b></td>
                      <td><textarea rows="4" cols="25" type="textbox" ref="infoSign" /></td>
                  </tr>
              </tbody>
          </table>
          <button ref="makeEvent">Lag</button>
      </div>
    )
  }

  componentDidMount() {
      // what type of event is made. MAL.
    this.refs.makeEvent.onclick = () => {
      let nyttEvent = {
        Navn: this.refs.navnSign.value,
        Lokasjon: this.refs.lokasjonSign.value,
        dato_start: this.refs.datoStartSign.value,
        dato_slutt: this.refs.datoSluttSign.value,
        annen_info: this.refs.infoSign.value
      };
      eventQueries.createNewEvent(nyttEvent).then(() => {
        this.refs.navnSign.value = "";
        this.refs.lokasjonSign.value = "";
        this.refs.datoStartSign.value = "";
        this.refs.datoSluttSign.value = "";
        this.refs.infoSign.value = "";
        history.push("/kalender");
      });
    };
  }
}

export default newEvent;
