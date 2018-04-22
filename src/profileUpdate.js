import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Table, Button} from "react-bootstrap"

class profileUpdate extends React.Component {
  constructor(props) {
    super(props);

    // Henter id til brukern vi skal redigere.
    this.id = props.match.params.brukerID;
    // Brukeren som skal bli redigert.
    this.bruker = {};

  }

  render() {
    return (
      <div className="LoginDiv">
          <h3>Endring av {this.bruker.fornavn} {this.bruker.etternavn}</h3>
          <table>
              <tbody>

                <tr>
                    <td><b>Epost:</b></td>
                    <td><input type="text" ref="epostSign" /></td>
                </tr>

                <tr>
                    <td><b>Etternavn: </b></td>
                    <td><input type="text" ref="etternavnSign" /></td>
                </tr>

                <tr>
                    <td><b>Fornavn:</b> </td>
                    <td><input type="text" ref="fornavnSign" /></td>
                </tr>

                <tr>
                    <td><b>Passord:</b></td>
                    <td><input type="password" ref="passordSign" /></td>
                </tr>

                <tr>
                    <td><b>Adresse:</b></td>
                    <td><input type="text" ref="adresseSign" /></td>
                </tr>

                <tr>
                    <td><b>Postnummer: </b></td>
                    <td><input type="text" ref="postnrSign" /></td>
                </tr>

                <tr>
                    <td><b>Poststed:</b> </td>
                    <td><input type="text" ref="poststedSign" /></td>
                </tr>

                <tr>
                    <td><b>Telefon:</b> </td>
                    <td><input type="text" ref="telefonSign" /></td>
                </tr>
                <tr ref="adminRed">
                    <td><b>Admin Status:</b></td>
                    <td><select ref="adminStat">
                        <option value="0">Nei</option>
                        <option value="1">Ja</option>
                    </select></td>
                </tr>
              </tbody>
          </table>
          <Button bsStyle="info" id="saveInfo">Endre</Button>
      </div>
    );
  }

  componentDidMount() {

    // Henter brukern info og setter det inn i inputs.
    queries.hentBruker(this.id).then(result => {
      this.bruker = result[0];
      this.forceUpdate();

      if(this.bruker.adminStat) {
          this.refs.adminRed.style.display = "table-row";
      }
      else {
          this.refs.adminRed.style.display = "none";
      }

      this.refs.epostSign.value = result[0].epost;
      this.refs.etternavnSign.value = result[0].etternavn;
      this.refs.fornavnSign.value = result[0].fornavn;
      this.refs.passordSign.value = result[0].passord;
      this.refs.adresseSign.value = result[0].adresse;
      this.refs.postnrSign.value = result[0].postNr;
      this.refs.poststedSign.value = result[0].postSted;
      this.refs.telefonSign.value = result[0].tlf;
      this.refs.adminStat.value = result[0].adminStat;
    });

    // pågrunn av bs Style må vi hente knappen på den gamle måten.
    let saveInfo = document.getElementById("saveInfo");
    saveInfo.onclick = () => {
        // lager en object for enkelrer henting av informasjon i querien.
        let newInfo = {
            epost: this.refs.epostSign.value,
            etternavn: this.refs.etternavnSign.value,
            fornavn: this.refs.fornavnSign.value,
            passord: this.refs.passordSign.value,
            adresse: this.refs.adresseSign.value,
            postNr: this.refs.postnrSign.value,
            postSted: this.refs.poststedSign.value,
            tlf: this.refs.telefonSign.value,
            brukerID: this.id,
            adminStat: this.refs.adminStat.value
        };


        // Selve querien og sjekker om brukeren er den som er logget inn, hvis det er sånn så endrer vi localStorage.
        // Ellers så pushe vi til profile til personen vi oppdaterte.
        queries.updateQuery(newInfo).then(() => {
            let brukerLoggetInn = JSON.parse(localStorage.getItem("loggetInnBruker"))
            if(brukerLoggetInn.brukerID === this.bruker.brukerID) {
                localStorage.removeItem('loggetInnBruker');
                localStorage.setItem("loggetInnBruker", JSON.stringify(newInfo));
            }
            history.push("/profile/"+this.bruker.brukerID);
            this.forceUpdate();
        });
    };
  }
}
export default profileUpdate;
