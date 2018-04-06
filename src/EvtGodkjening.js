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
                <li key={i.eventID}>{i.eventNavn} @ {i.eventPlass}, dato: {i.eventDato} <button onClick={() => {
                    eventQueries.godkjenning(i.eventID, event, true).then(() => {
                        this.events.splice(this.events.indexOf(i), 1);
                        this.forceUpdate();
                    });
                }
                }>v</button>
                    <button onClick={() => {
                    eventQueries.godkjenning(i.eventID, event, false).then(() => {
                        this.events.splice(this.events.indexOf(i), 1);
                        this.forceUpdate();
                    });
                }
                }>x</button></li>
            )
        }

        return (
            <div>
                <h1>Event godkjenning:</h1>
                <ul>{arrayEvents}</ul>
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