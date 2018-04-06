import React from "react";
import {eventQueries, queries} from "./services";
import {Glyphicon} from 'react-bootstrap';

class BrukerGodkjenning extends React.Component {
    constructor (props) {
        super(props);

        this.brukere = []
    }

    render() {
        let arrayBrukere = [];
        for (let i of this.brukere) {
            arrayBrukere.push(
                <li key={i.brukerID}>{i.fornavn} {i.etternavn}<button onClick={() => {
                    eventQueries.godkjenning(i.brukerID, 'bruker', true).then(() => {
                        this.brukere.splice(this.brukere.indexOf(i), 1);
                        this.forceUpdate();
                    });
                }
                }>v</button>
                    <button onClick={() => {
                        eventQueries.godkjenning(i.brukerID, 'bruker', false).then(() => {
                            this.brukere.splice(this.brukere.indexOf(i), 1);
                            this.forceUpdate();
                        });
                    }
                    }>x</button></li>
            )
        }


        return (
            <div>
                <h1>Event godkjenning:</h1>
                <ul>{arrayBrukere}</ul>
            </div>
        )
    }

    componentDidMount() {
        queries.hentIkkeGodkjenteBrukere().then((result) => {
            this.brukere = result;
            this.forceUpdate();
        })
    }



}




export default BrukerGodkjenning;