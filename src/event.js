import React from "react";
import {eventQueries, queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {roller, eventMaler} from "./rollerOgEventMal.js";

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        this.id = props.match.params.eventID;
        this.event = {};
        this.deltakere = [];
        this.rolle = [];

    }
    render () {
        let arreyTest = [];
        for (let deltaker of this.deltakere) {
            arreyTest.push(
                <li key={deltaker.brukerID}>
                    {deltaker.fornavn} <b>deltar som</b> {deltaker.deltarSom}.
                </li>
            )
        }

        let rolleKravList = [];
        if (this.event.eventKey) {
            for (let x of eventMaler[this.event.eventKey].krav) {
                if (x.antall === 0) {
                    continue;
                }
                else {
                    rolleKravList.push(
                        <li key={x.antall + x.rolle}>{x.rolle}</li>
                    );
                    x.antall--;
                }
            }
        }

        let rolleList = [];
        if (this.rolle) {
            for (let rolle of this.rolle) {
                rolleKravList.forEach(function (x) {
                    if (x.props.children === rolle) {
                        rolleList.push(
                            <option value={rolle} key={rolle}>{rolle}</option>
                        )
                    }
                });

            }
        }

        return (
            <div>
                <h1>{this.event.eventNavn}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Lokasjon:</b> </td>
                            <td>{this.event.eventPlass}</td>
                        </tr>
                        <tr>
                            <td><b>Start dato:</b></td>
                            <td>{this.event.eventDatoStart}</td>
                        </tr>
                        <tr>
                            <td><b>Slutt dato:</b> </td>
                            <td>{this.event.eventDatoSlutt}</td>
                        </tr>
                        <tr>
                            <td><b>Informasjon:</b> </td>
                            <td>{this.event.informasjon}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button ref="test">Meld deg på her!</button></td>
                        </tr>
                    </tbody>
                </table>
                <span>
                    <h3>Se hvem som skal: </h3>
                    <ul>{arreyTest}</ul>
                </span>
                <span>
                    <h3>Hva mangler: </h3>
                    <ul>{rolleKravList}</ul>
                </span>
                <div ref="joinEventDiv" id="hiddenDiv" >
                    <p>Velg med hvilken rolle du skal bli med som:</p>
                    <select  ref="valgtKvali">{rolleList}</select>
                    <button ref="joinBtn">Meld deg på!</button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        eventQueries.hentEvent(this.id).then((result) => {
            this.event = result[0] ;
            this.forceUpdate();
        });

        eventQueries.hentDeltakere(this.id).then((result) => {
            this.deltakere = result;
            this.forceUpdate();
        });

        let bruker = queries.brukerLoggetInn();
        queries.hentRolle(bruker.brukerID).then((result) => {
            this.rolle = result;
            this.forceUpdate();
        });

        this.refs.test.onclick= () => {
            this.refs.joinEventDiv.style.display = "block";
        };

        this.refs.joinBtn.onclick = () => {
            let bruker = queries.brukerLoggetInn();
            eventQueries.joinEvent(this.event.eventID, bruker.brukerID, this.refs.valgtKvali.value).then((result) => {
                history.push('/kalender');
            });
        }
    }



}

export default Profile;
