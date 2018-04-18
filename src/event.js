import React from "react";
import {eventQueries, queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {roller, eventMaler} from "./rollerOgEventMal.js";
import {Button, Table,Grid, Col, ListGroup, ListGroupItem, DropdownButton, MenuItem} from "react-bootstrap";

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
                <ListGroupItem key={deltaker.brukerID}>
                    {deltaker.fornavn} <b>deltar som</b> {deltaker.deltarSom}.
                </ListGroupItem>
            )
        }

        let rolleKravList = [];
        let eventType;
        if (this.event.eventKey) {
            eventType = eventMaler[this.event.eventKey - 1].navn;
            for (let x of eventMaler[this.event.eventKey - 1].krav) {
                    arreyTest.forEach((y) => {
                        if (y.props.children[4] === x.rolle) {
                            x.antall--;
                            if (x.antall === 0) {
                                rolleKravList.push(
                                    <ListGroupItem bsStyle="success"
                                                   key={x.antall + x.rolle}>{x.rolle}: {x.antall}</ListGroupItem>
                                );
                            }
                        }
                        else{
                            rolleKravList.push(
                                <ListGroupItem bsStyle="warning" key={x.antall + x.rolle}>{x.rolle}: {x.antall}</ListGroupItem>
                            );
                        }
                    });
            }
        }

        console.log(rolleKravList)

        let rolleList = [];
        if (this.rolle) {
            for (let rolle of this.rolle) {
                rolleKravList.forEach(function (x) {
                    if (x.props.children[0] === rolle) {
                        rolleList.push(
                            <option value={rolle} key={rolle}>{rolle}</option>
                        )
                    }
                });

            }
        }

        if (this.event.godkjent !== 0) {
            return (
                <div>
                    <Grid>
                        <h1>{this.event.eventNavn}</h1>
                        <Table striped>
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
                                <td><b>Event Type:</b> </td>
                                <td>{eventType}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><Button id="Meldpaa">Meld deg på her!</Button></td>
                            </tr>
                            </tbody>
                        </Table>

                        <Col>
                            <h3>Se hvem som skal: </h3>
                            <ListGroup>{arreyTest}</ListGroup>
                        </Col>


                        <h3>Hva mangler: </h3>
                        <ListGroup>{rolleKravList}</ListGroup>


                        <div ref="joinEventDiv" id="hiddenDiv" >
                            <h3>Velg med hvilken rolle du skal bli med som:</h3>
                            <select  ref="valgtKvali">{rolleList}</select>
                            <Button bsStyle="info" id="joinBtn">Meld deg på!</Button>
                        </div>
                    </Grid>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Grid>
                        <h1>{this.event.eventNavn}</h1>
                        <Table striped>
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
                                <td><b>event Type:</b> </td>
                                <td>{eventType}</td>
                            </tr>
                            </tbody>
                        </Table>

                    </Grid>
                </div>
            )
        }

    }

    componentDidMount() {
        eventQueries.hentEvent(this.id).then((result) => {
            this.event = result[0] ;
            eventQueries.hentDeltakere(this.id).then((result) => {
                this.deltakere = result;
                let bruker = queries.brukerLoggetInn();
                queries.hentRolle(bruker.brukerID).then((result) => {
                    this.rolle = result;
                    this.forceUpdate();
                });
            });
        });

        let meldPaa = document.getElementById("Meldpaa");
        if (meldPaa){
            meldPaa.onclick= () => {
                this.refs.joinEventDiv.style.display = "block";
            };
        }

        let joinBtn = document.getElementById("joinBtn");
        if (joinBtn) {
            joinBtn.onclick = () => {
                let bruker = queries.brukerLoggetInn();
                if (this.refs.valgtKvali.value) {
                    eventQueries.joinEvent(this.event.eventID, bruker.brukerID, this.refs.valgtKvali.value).then((result) => {
                        history.push('/kalender');
                    }, () => {
                        alert("Ser ut som at du allerede er påmeldt på dette arrangementet. \nHvis du ønsker å melde deg av snakk med en administrator.")
                    });
                }
                else {
                    alert('Velg en rolle som du vil delta som.')
                }
            }
        }
    }



}

export default Profile;
