import React from "react";
import {eventQueries} from "./services";

class EventGodkjenning extends React.Component {
    constructor (props) {
        super(props);
        this.events = [];
    }

    render() {
    let arrayEvents = [];
        for (let i of this.events) {
            arrayEvents.push(
                <tr key={i.eventID}>
                    <td>
                    {i.eventNavn} @ {i.eventPlass}, dato: {i.eventDato}
                    </td>

                    <td>
                        <button onClick={() => {
                            eventQueries.godkjenning(i.eventID, event, true).then(() => {
                                this.events.splice(this.events.indexOf(i), 1);
                                this.forceUpdate();
                            });
                        }}>v</button>

                        <button onClick={() => {
                        eventQueries.godkjenning(i.eventID, event, false).then(() => {
                            this.events.splice(this.events.indexOf(i), 1);
                            this.forceUpdate();
                        });
                        }}>x</button>
                    </td>
                </tr>
            )
        }

        return (
            <div>
                <h1>Event godkjenning:</h1>
                <table>
                    <tbody>
                        {arrayEvents}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        eventQueries.hentIkkeGodkjentEvents().then((result) => {
            this.events = result;
            this.forceUpdate();
        })
    }



}

export default EventGodkjenning;