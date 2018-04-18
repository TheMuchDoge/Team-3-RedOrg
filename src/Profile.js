import React from "react";
import {NavLink} from 'react-router-dom';
import {queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Button, Glyphicon, Table, Grid, Row, Col,ListGroup, ListGroupItem} from "react-bootstrap";

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        this.id = props.match.params.brukerID;
        this.bruker = {};
        this.kvali = [];
        this.rolle = [];
    }
    render () {
        let brukerOne = JSON.parse(localStorage.getItem("loggetInnBruker"))
        let kvaliList = [];
        let rolleList = [];
        if (this.bruker) {

            for (let kvali of this.kvali) {
                if(brukerOne.adminStat || brukerOne.brukerID === this.bruker.brukerID) {
                    kvaliList.push(
                        <ListGroupItem key={kvali.kvaliID}>
                            <b>{kvali.kvaliType}</b>
                            <Button onClick={() => {
                                queries.removeKvali(kvali.kvaliID)
                            }}><Glyphicon glyph="remove"/>
                            </Button>
                            <p>t.o.m.: {kvali.utlopsDato}</p>
                        </ListGroupItem>
                    )
                }
                else {
                    kvaliList.push(
                        <ListGroupItem key={kvali.kvaliID}>
                            <b>{kvali.kvaliType}</b>
                            <p>t.o.m.: {kvali.utlopsDato}</p>
                        </ListGroupItem>
                    )
                }
            }


            for (let rolle of this.rolle) {
                rolleList.push(
                    <ListGroupItem key={rolle}>{rolle}</ListGroupItem>
                )
            }
        }
        if(brukerOne) {
            if (brukerOne.adminStat || brukerOne.brukerID === this.bruker.brukerID) {
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={8}>
                                    <h1>{this.bruker.fornavn} {this.bruker.etternavn}</h1>
                                </Col>
                                <Col xs={2}>
                                    <NavLink
                                        to={'/profileUpdate/' + this.bruker.brukerID}><Button style={{marginTop: 25 + "px"}}>Rediger <Glyphicon
                                        glyph="pencil"/></Button></NavLink>{' '}
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
                                        <td>{rolleList}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Kvalifikasjoner:</b></td>
                                        <td>{kvaliList}</td>
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
                                    <td><Button bsStyle="info" id="addBtn">Send til databasen <Glyphicon
                                        glyph="chevron-right"></Glyphicon> </Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </div>
                )
            }
            else {
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
                                <td>{rolleList}</td>
                            </tr>
                            <tr>
                                <td><b>Kvalifikasjoner:</b></td>
                                <td>{kvaliList}</td>
                            </tr>

                            </tbody>
                        </Table>

                    </div>
                )
            }
        }
    }

    componentDidMount() {
        let addBtn = document.getElementById("addBtn")
        if(addBtn) {
            addBtn.onclick = () => {
                if (this.refs.kvali.value === "" || this.refs.nyKvaliDato.value === "") {
                    alert("Vennligst fyll inn både dato og hvilken kvalifikasjons type du har.")
                }
                queries.sendKvali(this.id, this.refs.kvali.value, this.refs.nyKvaliDato.value).then(() => {
                    this.forceUpdate();
                });
            };
        }


        queries.hentBruker(this.id).then((result) => {
            this.bruker = result[0];
            queries.hentKvali(this.id).then((result) => {
                this.kvali = result;
                queries.hentRolle(this.id).then((result) => {
                    this.rolle = result;
                    this.forceUpdate();
                });
            });
        });





    }

}


export default Profile;
