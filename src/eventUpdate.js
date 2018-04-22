import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Table, Button} from "react-bootstrap"
import {eventMaler} from "./rollerOgEventMal";
import {eventQueries} from "./services";

class eventUpdate extends React.Component {
    constructor(props) {
        super(props);

        // Henter id til brukern vi skal redigere.
        this.id = props.match.params.eventID;
        // Brukeren som skal bli redigert.
        this.event = {};
    }



    render() {
        let eventList = [];
        for (let x in eventMaler) {
            eventList.push(
                <option key={eventMaler[x].key} value={eventMaler[x].key}>{eventMaler[x].navn}</option>
            )
        }

        if (this.event) {
            return (
                <div className="LoginDiv">
                    <h3>Endring av {this.event.eventNavn}</h3>
                    <table>
                        <tbody>

                        <tr>
                            <td><b>Navn:</b></td>
                            <td><input type="text" ref="navnEdit" /></td>
                        </tr>
                        <tr>
                            <td><b>Lokasjon:</b></td>
                            <td><input type="text" ref="plassEdit" /></td>
                        </tr>
                        <tr>
                            <td><b>Dato start:</b></td>
                            <td><input type="date" ref="datoStartEdit" /></td>
                        </tr>
                        <tr>
                            <td><b>Dato slutt:</b></td>
                            <td><input type="date" ref="datoSluttEdit" /></td>
                        </tr>
                        <tr>
                            <td><b>Type arrangment:</b></td>
                            <td><select ref="eventKey" >{eventList}</select></td>
                        </tr>
                        <tr>
                            <td><b>Annen informasjon:</b></td>
                            <td><textarea rows="4" cols="25" type="textbox" ref="infoEdit" /></td>
                        </tr>
                        </tbody>
                    </table>
                    <Button bsStyle="info" id="saveInfo">Endre</Button>
                </div>
            )
        }
    }

    componentDidMount() {
        // Henter brukern info og setter det inn i inputs.
        eventQueries.hentEvent(this.id, false).then(result => {
            this.event = result[0];
            this.forceUpdate();

            this.refs.navnEdit.value = result[0].eventNavn;
            this.refs.plassEdit.value = result[0].eventPlass;
            this.refs.datoStartEdit.value = result[0].eventDatoStart.toISOString().substring(0, 10);
            this.refs.datoSluttEdit.value = result[0].eventDatoSlutt.toISOString().substring(0, 10);
            this.refs.infoEdit.value = result[0].informasjon;
            this.refs.eventKey.value = result[0].eventKey;

        });

        // pågrunn av bs Style må vi hente knappen på den gamle måten.
        let saveInfo = document.getElementById("saveInfo");
        saveInfo.onclick = () => {
            // lager en object for enkelrer henting av informasjon i querien.
            let newInfo = {
                eventNavn: this.refs.navnEdit.value,
                eventPlass: this.refs.plassEdit.value,
                eventDatoStart: this.refs.datoStartEdit.value,
                eventDatoSlutt: this.refs.datoSluttEdit.value,
                informasjon: this.refs.infoEdit.value,
                eventKey: this.refs.eventKey.value
            };
            // Selve querien og sjekker om brukeren er den som er logget inn, hvis det er sånn så endrer vi localStorage.
            // Ellers så pushe vi til profile til personen vi oppdaterte.
            eventQueries.updateEvent(newInfo).then(() => {
                history.push("/event/"+this.id);
                this.forceUpdate();
            });
        };
    }
}
export default eventUpdate;
