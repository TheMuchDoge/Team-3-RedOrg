import React from "react";
import {NavLink} from 'react-router-dom';
import {queries} from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Profile extends React.Component  {
    constructor(props) {
        super(props);

        this.id = props.match.params.brukerID;
        this.bruker = {};
        this.kvali = [];
        this.rolle = [];
    }
    render () {
        let kvaliList = [];
        for (let kvali of this.kvali) {
            kvaliList.push(
                <li key={kvali.kvaliID}>
                    <p><b>{kvali.kvaliType}</b></p>
                    <p>t.o.m.: {kvali.utlopsDato}</p>
                </li>
            )
        }

        let rolleList = [];
        for (let rolle of this.rolle) {
            rolleList.push(
                <li key={rolle}>{rolle}</li>
            )
        }
        let brukerOne = queries.brukerLoggetInn();

        if (brukerOne.adminStat || bruker.brukerID === this.bruker.brukerID) {
            return (
                <div>
                    <h1>{this.bruker.fornavn} {this.bruker.etternavn}</h1>
                    <button><NavLink activeStyle={{color: 'green'}} to={'/profileUpdate/' + this.bruker.brukerID}>Rediger</NavLink>{' '}</button>
                    <table>
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
                            <td><b>Postnr:</b></td>
                            <td>{this.bruker.postNr}</td>
                            <td><b>Poststed:</b></td>
                            <td>{this.bruker.postSted}</td>
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
                    </table>



                    <table>
                        <tbody>
                            <tr>
                                <td><b>Legg til kvalifikasjon:</b></td>
                                <td>
                                    <select ref="kvali">
                                        <option disabled> // Kurs og prøver</option>
                                        <option value="Hjelpekorpsprøve">Hjelpekorpsprøve</option>
                                        <option value="Ambulansesertifisering">Ambulansesertifisering</option>
                                        <option value="Videregående førstehjelpskurs">Videregående førstehjelpskurs</option>
                                        <option value="Maritimt VHF-sertifikat">Maritimt VHF-sertifikat</option>
                                        <option value="Videregående sjøredningskurs">Videregående sjøredningskurs</option>
                                        <option value="Kvalifisert sjøredningskurs">Kvalifisert sjøredningskurs</option>
                                        <option value="Kvalifisert kurs søk og redning">Kvalifisert kurs søk og redning</option>
                                        <option value="Kvalifisert kurs søk og redning (vinter)">Kvalifisert kurs søk og redning (vinter)</option>
                                        <option value="Kvalifisert kurs søk og redning (sommer)">Kvalifisert kurs søk og redning (sommer)</option>
                                        <option disabled></option>
                                        <option disabled> // Kjøretøy</option>
                                        <option value="Kvalifisert snøscooterkurs">Kvalifisert snøscooterkurs</option>
                                        <option value="Førerkort S snøscooter">Førerkort S snøscooter</option>
                                        <option value="Førerkort BE tilhenger">Førerkort BE tilhenger</option>
                                        <option value="Førerkort 160 utrykningskjøring">Førerkort 160 utrykningskjøring</option>
                                        <option value="Båtførerprøven">Båtførerprøven</option>
                                        <option value="Kvalifisert ATV kurs">Kvalifisert ATV kurs</option>

                                        <option disabled></option>
                                        <option disabled> // Leder og sensor </option>
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
                                <td><button ref="addBtn">Send til databasen.</button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>{this.bruker.fornavn} {this.bruker.etternavn}</h1>
                    <table>
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
                            <td><b>Postnr:</b></td>
                            <td>{this.bruker.postNr}</td>
                            <td><b>Poststed:</b></td>
                            <td>{this.bruker.postSted}</td>
                        </tr>
                        <tr>
                            <td><b>Poeng:</b></td>
                            <td>{this.bruker.poeng}</td>
                        </tr>
                        <tr>
                            <tr><b>Roller:</b></tr>
                            <tr>{rolleList}</tr>
                        </tr>
                        <tr>
                            <td><b>Kvalifikasjoner:</b></td>
                           <ul>{kvaliList}</ul>
                        </tr>

                        </tbody>
                    </table>

                </div>
            )
        }
    }

    componentDidMount() {
        this.refs.addBtn.onclick = () => {
                queries.sendKvali(this.id, this.refs.kvali.value, this.refs.nyKvaliDato.value).then(() => {
                    this.forceUpdate();
                });
        };

        queries.hentBruker(this.id).then((result) => {
            this.bruker = result[0];
            this.forceUpdate();
        });


        queries.hentKvali(this.id).then((result) => {
            this.kvali = result;
            this.forceUpdate();
        });

        queries.hentRolle(this.id).then((result) => {
            this.rolle = result;
            this.forceUpdate();
        });
    }

}


export default Profile;
