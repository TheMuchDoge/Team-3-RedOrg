import React from "react";
import { NavLink } from "react-router-dom";
import {eventQueries, queries} from "./services";
import createHashHistory from "history/createHashHistory";
import {roller, eventMaler} from "./rollerOgEventMal.js";
import {Button, Table,Grid, Col, ListGroup, ListGroupItem, Row, Glyphicon} from "react-bootstrap";
const history = createHashHistory();

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        // this.id blir hentet fra navlinken som brukeren trykte på.
        // Dette sørger for at vi kan lage en mal å ha uendelig med events som har samme mal.
        this.id = props.match.params.eventID;

        // Lagrer en object for event (siden det kun er et), en array for alle (mulige) deltakere, og en for alle mulige roller for logget inn bruker.
        this.event = {};
        this.eventType = "";

        this.deltakere = [];
        this.deltakereList = [];

        this.rolle = [];
        this.rolleList = [];

        this.loggetBruker = JSON.parse(localStorage.getItem('loggetInnBruker'));
    }

    deltakerFunc() {
        // En for loop som pusher ut alle deltakere i en liste (this.deltakere)
        for (let deltaker of this.deltakere) {
            if (this.loggetBruker.brukerID === deltaker.brukerID || this.loggetBruker.adminStat) {
                this.deltakereList.push(
                    <ListGroupItem key={deltaker.brukerID}>
                        {deltaker.fornavn} <b>deltar som</b> {deltaker.deltarSom}. <Button onClick={() => {
                        this.rolleList = [];
                        eventQueries.removeDeltakelse(deltaker.brukerID).then(() => {
                            this.deltakereList = [];
                            eventQueries.hentDeltakere(this.id).then((result) => {
                                this.deltakere = result;
                                this.deltakerFunc();
                                this.rollerFunc();
                                this.forceUpdate();
                            })
                        })
                    }}><Glyphicon glyph="remove"/></Button>
                    </ListGroupItem>
                )
            }
            else{
                this.deltakereList.push(
                    <ListGroupItem key={deltaker.brukerID}>
                        {deltaker.fornavn} <b>deltar som</b> {deltaker.deltarSom}.
                    </ListGroupItem>
                )
            }
        }
    }

    rollerFunc() {

        // En for loop for kravene av denne eventen. og en variable som skrivet ut eventType.
            this.eventType = eventMaler[this.event.eventKey - 1].navn;
            for (let x of eventMaler[this.event.eventKey - 1].krav) {
                // Hvis det ikke er noe deltakere: så push alle men bs warning style (oransj)
                if ( this.deltakereList.length === 0 ) {
                    this.rolleList.push(
                        <ListGroupItem bsStyle="warning"
                                       key={x.antall + x.rolle}>{x.rolle}: {x.antall}</ListGroupItem>
                    );
                }
                else {
                    // Hvis det finnes deltakere så for hver gang du går gjennom deltaker listen sjekk om rollen er samme som deltaker sin "deltarsom"
                    // Hvis det er sant så dekrementer og hvis antall er null så skriv ut med bs style success.
                    // Ellers skriv ut med antall

                        this.deltakereList.forEach((y) => {
                            if (y.props.children[4] === x.rolle) {
                                x.antall--;
                            }
                        });

                    if(x.antall === 0) {
                        this.rolleList.push(
                            <ListGroupItem bsStyle="success"
                                           key={x.antall + x.rolle}>{x.rolle}: {x.antall}</ListGroupItem>
                        );
                    }
                    else {
                        this.rolleList.push(
                            <ListGroupItem bsStyle="warning"
                                           key={x.antall + x.rolle}>{x.rolle}: {x.antall}</ListGroupItem>
                        );
                    }
                }
            }
        }

    render () {





        // For hver rolle som brukeren har så sjekker om den finnes i eventMal.krav, hvis så¨legg den til i select.
        let rolleList = [];
        if (this.rolle) {
            for (let rolle of this.rolle) {
                this.rolleList.forEach(function (x) {
                    if (x.props.children[0] === rolle) {
                        rolleList.push(
                            <option value={rolle} key={rolle}>{rolle}</option>
                        )
                    }
                });

            }
        }

            // hvis eventen er godkjent så legger den til muligheten for å melde seg på og hva som trenges.
        if (this.event.godkjent === 1) {
            if (this.loggetBruker.adminStat) {
            return (
                <div>
                    <Grid>
                        <Row>
                            <Col xs={8}>
                                <h1>{this.event.eventNavn}</h1>
                            </Col>
                            <Col xs={4}>
                                <NavLink
                                    to={"/eventUpdate/" + this.id}><Button style={{marginTop: 25 + "px"}}><Glyphicon
                                    glyph="pencil"/>Rediger </Button></NavLink>{' '}
                                    <Button bsStyle="danger" id="slettEvent" style={{marginTop: 25 + "px"}} onClick={() => {
                                            let check = confirm("Er du sikker på at du vil slette "+ this.event.eventNavn +"?")
                                        if (check) {
                                            eventQueries.removeEvent(this.id).then(() => {
                                                history.push("/kalender");
                                            })
                                        }


                            }}><Glyphicon
                                glyph="remove"/>Slett</Button>
                            </Col>
                        </Row>
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
                                <td>{this.eventType}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><Button id="Meldpaa1" onClick={() => {
                                    this.refs.joinEventDiv.style.display = "block"
                                }}>Meld deg på her!</Button></td>
                            </tr>
                            </tbody>
                        </Table>

                        <Col>
                            <h3>Se hvem som skal: </h3>
                            <ListGroup>{ this.deltakereList}</ListGroup>
                        </Col>


                        <h3>Hva mangler: </h3>
                        <ListGroup>{this.rolleList}</ListGroup>


                        <div ref="joinEventDiv" id="hiddenDiv" style={{marginBottom: 200+"px"}} >
                            <h3>Velg med hvilken rolle du skal bli med som:</h3>
                            <select  ref="valgtRolle">{rolleList}</select>
                            <Button bsStyle="info" id="joinBtn" onClick={() => {
                                if (this.refs.valgtRolle.value) {
                                    eventQueries.joinEvent(this.event.eventID, this.loggetBruker.brukerID, this.refs.valgtRolle.value, this.loggetBruker.poeng).then((result) => {
                                        eventQueries.hentDeltakere(this.event.eventID).then((result) => {
                                            this.deltakere = result;
                                            this.deltakerFunc();
                                            this.rollerFunc();
                                        })
                                    }, () => {
                                        // hvis brukeren allerede er med på eventen så rejecte promisen queriem og brukern få tilbakemlding.
                                        alert("Ser ut som at du allerede er påmeldt på dette arrangementet. \nHvis du ønsker å melde deg av snakk med en administrator.")
                                    });
                                }
                                else {
                                    alert('Velg en rolle som du vil delta som.')
                                }
                                this.forceUpdate();
                            }}>Meld deg på!</Button>
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
                                    <td><b>Event Type:</b> </td>
                                    <td>{this.eventType}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Button id="Meldpaa" onClick={() => {
                                        this.refs.joinEventDiv.style.display = "block"
                                    }}>Meld deg på her!</Button></td>
                                </tr>
                                </tbody>
                            </Table>

                            <Col>
                                <h3>Se hvem som skal: </h3>
                                <ListGroup>{ this.deltakereList}</ListGroup>
                            </Col>


                            <h3>Hva mangler: </h3>
                            <ListGroup>{this.rolleList}</ListGroup>


                            <div ref="joinEventDiv" id="hiddenDiv" style={{marginBottom: 200+"px"}} >
                                <h3>Velg med hvilken rolle du skal bli med som:</h3>
                                <select  ref="valgtRolle">{rolleList}</select>
                                <Button bsStyle="info" id="joinBtn" onClick={() => {
                                    let bruker = queries.brukerLoggetInn();
                                    if (this.refs.valgtRolle.value) {
                                        eventQueries.joinEvent(this.event.eventID, bruker.brukerID, this.refs.valgtRolle.value, bruker.poeng).then(() => {
                                            eventQueries.hentDeltakere(this.event.eventID).then((result) => {
                                                this.deltakere = result;
                                                this.rolleList =[];
                                                this.deltakerFunc();
                                                this.rollerFunc();
                                            })
                                        }, () => {
                                            // hvis brukeren allerede er med på eventen så rejecte promisen queriem og brukern få tilbakemlding.
                                            alert("Ser ut som at du allerede er påmeldt på dette arrangementet. \nHvis du ønsker å melde deg av snakk med en administrator.")
                                        });
                                    }
                                    else {
                                        alert('Velg en rolle som du vil delta som.')
                                    }
                                }}>Meld deg på!</Button>
                            </div>
                        </Grid>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <Grid>
                        <Col xs={8}>
                            <h1>{this.event.eventNavn}</h1>
                        </Col>
                        <Col xs={4}>
                            <NavLink
                                to={"/eventUpdate/" + this.id}><Button style={{marginTop: 25 + "px"}}><Glyphicon
                                glyph="pencil"/>Rediger </Button></NavLink>{' '}
                        </Col>
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
                                <td>{this.eventType}</td>
                            </tr>
                            </tbody>
                        </Table>

                    </Grid>
                </div>
            )
        }

    }

    componentDidMount() {
        // Henter først eventen. og pusher første resultat (siden det kun er et som blir returnert.
        eventQueries.hentEvent(this.id, true).then((result) => {
            this.event = result[0] ;
            // Så henter den deltakerene til eventen
            eventQueries.hentDeltakere(this.id).then((result) => {
                this.deltakere = result;
                this.deltakerFunc();
                this.rollerFunc();
                // Også henter den rollene til brukeren som er logget inn  og forceUpdate tilslutt.
                queries.hentRolle(this.loggetBruker.brukerID).then((result) => {
                    this.rolle = result;
                    this.forceUpdate();
                });
            });
        });
    }

}

export default Profile;
