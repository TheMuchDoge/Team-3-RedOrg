import React from "react";
import { eventQueries, queries} from "./services";

class Kalender extends React.Component {
    constructor(props) {
        super(props);

        this.events = [];
    }

    render() {
        let eventList = [];
        for (let i of this.events) {
            eventList.push(
                <li key={i.eventID}>{i.eventNavn} @ {i.eventPlass}</li>
            )
        }

        return (
            <div>
                <h1>Kalender: </h1>
                <ul>{eventList}</ul>
            </div>
        )
    }

    componentDidMount () {
        eventQueries.hentEvents().then((results) => {
            this.events = results;
            this.forceUpdate();
        })
    }

}

export default Kalender;