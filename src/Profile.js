import React from "react";
import {NavLink} from 'react-router-dom';
import {eventQueries, queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Button, Glyphicon, Table, Grid, Row, Col,ListGroup, ListGroupItem} from "react-bootstrap";

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        // Henter id fra navlinken sopm brukeren trukket på.
        this.id = props.match.params.brukerID;
        // Et tomt object for å lagre bruker som skal vises
        this.bruker = {};
        // Tom array for kvalifikasjoner
        this.kvali = [];
        this.kvaliList = [];
        // Tom array for mulig roller til personen
        this.rolle = [];
        this.rolleList = [];
        this.loggetBruker = JSON.parse(localStorage.getItem("loggetInnBruker"));
    }

    kvaliFunc() {
        return new Promise((resolve, reject) => {
            // Itterer gjennom this.kvali og hvis det enten er brukeren som er logget inn på sin profile eller adminen som ser på en hvilken som helst side så
            // legger koden til en remove knapp
            this.kvaliList = [];
            for (let kvali of this.kvali) {
                if(this.loggetBruker.adminStat || this.loggetBruker.brukerID === this.bruker.brukerID) {
                    this.kvaliList.push(
                        <ListGroupItem key={kvali.kvaliID}>
                            <b>{kvali.kvaliType}</b>
                            <Button onClick={() => {
                                queries.removeKvali(kvali.kvaliID).then(() => {
                                    this.kvaliList = [];
                                    this.hentAlt();
                                })
                            }}><Glyphicon glyph="remove"/>
                            </Button>
                            <p>t.o.m.: {kvali.utlopsDato}</p>
                        </ListGroupItem>
                    )
                }
                else {
                    this.kvaliList.push(
                        <ListGroupItem key={kvali.kvaliID}>
                            <b>{kvali.kvaliType}</b>
                            <p>t.o.m.: {kvali.utlopsDato}</p>
                        </ListGroupItem>
                    )
                }
            }
            resolve();
        });
    }

    rolleFunc() {
        return new Promise ((resolve, reject) => {
            this.rolleList = [];
            for (let rolle of this.rolle) {
                this.rolleList.push(
                    <ListGroupItem key={rolle}>{rolle}</ListGroupItem>
                )
            }
            resolve();
        })

    }

    render () {
        // henter brukeren som er logget inn.b
        // Listen av kvali og roller

        // Hvis det er brukeren som er logget inn som er på profile eller brukern har adminStat så legger den til en rediger knapp som sender en bruker videre til profileUpdate.js
        if(this.loggetBruker) {
            if (this.loggetBruker.adminStat || this.loggetBruker.brukerID === this.bruker.brukerID) {
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={6}>
                                    <h1>{this.bruker.fornavn} {this.bruker.etternavn}</h1>
                                </Col>
                                <Col xs={6}>
                                    <NavLink
                                        to={'/profileUpdate/' + this.bruker.brukerID}><Button style={{marginTop: 25 + "px"}}>Rediger <Glyphicon
                                        glyph="pencil"/></Button></NavLink>{' '}<Button bsStyle="danger" id="slettEvent" style={{marginTop: 25 + "px"}} onClick={() => {
                                            if (this.id == this.loggetBruker.brukerID) {
                                                eventQueries.godkjenning(this.id, "bruker", false).then(() => {
                                                    localStorage.removeItem("loggetInnBruker");
                                                    history.push("/login");
                                                })
                                            }
                                            else {
                                                eventQueries.godkjenning(this.id,"bruker", false).then(() => {
                                                    history.back();
                                                })
                                            }
                                }}><Glyphicon
                                    glyph="remove"/>Slett</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Table striped>
                                    <tbody>
                                    <tr>
                                        <td><b>Epost:</b></td>
                                        <td>{this.bruker.epost}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Telefon:</b></td>
                                        <td> {this.bruker.tlf}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Adresse:</b></td>
                                        <td>{this.bruker.adresse}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Postnr:</b><br/><b>Poststed:</b></td>
                                        <td>{this.bruker.postNr}<br/>{this.bruker.postSted}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Poeng:</b></td>
                                        <td>{this.bruker.poeng}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Roller:</b></td>
                                        <td>{this.rolleList}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Kvalifikasjoner:</b></td>
                                        <td>{this.kvaliList}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Row>


                            <table>
                                <tbody>
                                <tr>
                                    <td><b>Legg til kvalifikasjon:</b></td>
                                    <td>
                                        <select ref="kvali">
                                            <option value="">Kvalifikasjons Liste</option>
                                            <option disabled> // Kurs og prøver</option>
                                            <option value="Hjelpekorpsprøve">Hjelpekorpsprøve</option>
                                            <option value="Ambulansesertifisering">Ambulansesertifisering</option>
                                            <option value="Videregående førstehjelpskurs">Videregående
                                                førstehjelpskurs
                                            </option>
                                            <option value="Maritimt VHF-sertifikat">Maritimt VHF-sertifikat</option>
                                            <option value="Videregående sjøredningskurs">Videregående sjøredningskurs
                                            </option>
                                            <option value="Kvalifisert sjøredningskurs">Kvalifisert sjøredningskurs
                                            </option>
                                            <option value="Kvalifisert kurs søk og redning">Kvalifisert kurs søk og
                                                redning
                                            </option>
                                            <option value="Kvalifisert kurs søk og redning (vinter)">Kvalifisert kurs
                                                søk og redning (vinter)
                                            </option>
                                            <option value="Kvalifisert kurs søk og redning (sommer)">Kvalifisert kurs
                                                søk og redning (sommer)
                                            </option>
                                            <option disabled></option>
                                            <option disabled> // Kjøretøy</option>
                                            <option value="Kvalifisert snøscooterkurs">Kvalifisert snøscooterkurs
                                            </option>
                                            <option value="Førerkort S snøscooter">Førerkort S snøscooter</option>
                                            <option value="Førerkort BE tilhenger">Førerkort BE tilhenger</option>
                                            <option value="Førerkort 160 utrykningskjøring">Førerkort 160
                                                utrykningskjøring
                                            </option>
                                            <option value="Båtførerprøven">Båtførerprøven</option>
                                            <option value="Kvalifisert ATV kurs">Kvalifisert ATV kurs</option>
                                            <option disabled></option>
                                            <option disabled> // Leder og sensor</option>
                                            <option value="Vaktlederkurs">Vaktlederkurs</option>
                                            <option value="Distriktsensorkurs">Distriktsensorkurs</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Utløpsdato for kvalifikasjon:</b></td>
                                    <td><input type="date" ref="nyKvaliDato"/></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Button bsStyle="info" onClick={() => {
                                            // Enkel validasjon og query for å legge til en kvalifikasjon.
                                            if (this.refs.kvali.value === "" || this.refs.nyKvaliDato.value === "") {
                                                alert("Vennligst fyll inn både dato og hvilken kvalifikasjons type du har.")
                                            }
                                            else {
                                                queries.sendKvali(this.id, this.refs.kvali.value, this.refs.nyKvaliDato.value).then(() => {
                                                    this.hentAlt();
                                                });
                                            }
                                    }}>Send til databasen <Glyphicon
                                        glyph="chevron-right" /></Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </div>
                )
            }
            else {
                // Ellers så returne koden en vanlig bruker info side uten mulighet for redigering.
                return (
                    <div>
                        <h1>{this.bruker.fornavn} {this.bruker.etternavn}</h1>
                        <Table>
                            <tbody>
                            <tr>
                                <td><b>Epost:</b></td>
                                <td>{this.bruker.epost}</td>
                            </tr>
                            <tr>
                                <td><b>Telefon:</b></td>
                                <td> {this.bruker.tlf}</td>
                            </tr>
                            <tr>
                                <td><b>Adresse:</b></td>
                                <td>{this.bruker.adresse}</td>
                            </tr>
                            <tr>
                                <td><b>Postnr:</b><br/><b>Poststed:</b></td>
                                <td>{this.bruker.postNr}<br/>{this.bruker.postSted}</td>
                            </tr>
                            <tr>
                                <td><b>Poeng:</b></td>
                                <td>{this.bruker.poeng}</td>
                            </tr>
                            <tr>
                                <td><b>Roller:</b></td>
                                <td>{this.rolleList}</td>
                            </tr>
                            <tr>
                                <td><b>Kvalifikasjoner:</b></td>
                                <td>{this.kvaliList}</td>
                            </tr>

                            </tbody>
                        </Table>

                    </div>
                )
            }
        }
    }

    hentAlt () {
        queries.hentKvali(this.id).then((result) => {
            this.kvali = result;
            this.kvaliFunc();
            queries.hentRolle(this.id).then((result) => {
                this.rolle = result;
                this.rolleFunc();
                this.forceUpdate();
            });
        });
    }

    componentDidMount() {
        // Først så henter vi brukern, så henter vi kvalifikasjoner til brukern også rollene brukern kan ha.
        queries.hentBruker(this.id).then((result) => {
            this.bruker = result[0];
            this.hentAlt();
        });
    }

}


export default Profile;
