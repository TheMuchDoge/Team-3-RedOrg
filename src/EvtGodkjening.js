import React from "react";
import {eventQueries} from "./services";
import {Button, Glyphicon, Table} from "react-bootstrap"
import { NavLink } from "react-router-dom";

class EventGodkjenning extends React.Component {
    constructor (props) {
        super(props);
        // Lagerer alle eventene hentet fra db query i componentDidMount
        this.events = [];
    }

    render() {
        // Array for å lagre alle eventene
    let arrayEvents = [];
        for (let i of this.events) {
            // Pushe en tabel row per event.
            // To knapper, en for å slette og en for å legge til.
            arrayEvents.push(
                <tr key={i.eventID}>
                    <td>
                        <h3><NavLink exact to={"/event/" + i.eventID} >{i.eventNavn}</NavLink> @ {i.eventPlass}, dato: {i.eventDatoStart} - {i.eventDatoSlutt}</h3>
                    </td>

                    <td>
                        <Button style={{marginTop: 10+"px"}} bsStyle="success"
                            onClick={() => {
                            eventQueries.godkjenning(i.eventID, event, true).then(() => {
                                this.events.splice(this.events.indexOf(i), 1);
                                this.forceUpdate();
                            });
                        }}><Glyphicon glyph="ok"/></Button>

                        <Button style={{marginTop: 10+"px"}} bsStyle="danger"
                            onClick={() => {
                        eventQueries.godkjenning(i.eventID, event, false).then(() => {
                            this.events.splice(this.events.indexOf(i), 1);
                            this.forceUpdate();
                        });
                        }}><Glyphicon glyph="remove"/></Button>
                    </td>
                </tr>
            )
        }

        // Returner arrayen i form av en table.
        return (
            <div>
                <h1>Event godkjenning:</h1>
                <Table>
                    <tbody>
                        {arrayEvents}
                    </tbody>
                </Table>
            </div>
        )
    }

    componentDidMount() {
        // Henter ikke godkjenteEvents.
        eventQueries.hentIkkeGodkjentEvents().then((result) => {
            this.events = result;
            this.forceUpdate();
        })
    }



}

export default EventGodkjenning;