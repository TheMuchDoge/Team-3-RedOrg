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
        <span>
          Navn: <input type="text" ref="navnSign" />
        </span>
        <br />
        <span>
          Lokasjon: <input type="text" ref="lokasjonSign" />
        </span>
        <br />
        <span>
          dato_start: <input type="date" ref="datoStartSign" />
        </span>
        <br />
        <span>
          dato_slutt: <input type="date" ref="datoSluttSign" />
        </span>
        <br />
        <span>
          annen_info: <textarea rows="4" cols="25" type="textbox" ref="infoSign" />
        </span>
        <br />
        <button ref="makeEvent">Lag</button>
      </div>
    );
  }

  componentDidMount() {
    this.refs.makeEvent.onclick = () => {
      let nyttEvent = {
        Navn: this.refs.navnSign.value.toLowerCase(),
        Lokasjon: this.refs.lokasjonSign.value.toLowerCase(),
        dato_start: this.refs.datoStartSign.value.toLowerCase(),
        dato_slutt: this.refs.datoSluttSign.value.toLowerCase(),
        annen_info: this.refs.infoSign.value.toLowerCase()
      };
      eventQueries.createNewEvent(nyttEvent).then(() => {
        this.refs.navnSign.value = "";
        this.refs.lokasjonSign.value = "";
        this.refs.datoStartSign.value = "";
        this.refs.datoSluttSign.value = "";
        this.refs.infoSign.value = "";
        history.push("./kalender");
      });
    };
  }
}

export default newEvent;
