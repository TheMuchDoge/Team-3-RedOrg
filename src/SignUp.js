import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Button} from "react-bootstrap"

class Skjema extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Enkel sign Up inputs.
    return (
      <div className="LoginDiv">
          <table>
              <tbody>
              <tr>
                  <td><b>Epost:</b></td>
                  <td> <input type="text" placeholder="Epost" ref="epostSign" required /></td>
              </tr>
              <tr>
                  <td><b>Fornavn:</b></td>
                  <td><input type="text" placeholder="Fornavn" ref="fornavnSign" required /></td>
              </tr>
              <tr>
                  <td><b> Etternavn: </b></td>
                  <td><input type="text" placeholder="Etternavn" ref="etternavnSign" required /></td>
              </tr>
              <tr>
                  <td><b>Passord:</b></td>
                  <td> <input type="password" placeholder="Passord" ref="passordSign" required /></td>
              </tr>
              <tr>
                  <td><b>Adresse: </b></td>
                  <td><input type="text" placeholder="Adresse" ref="adresseSign" required /></td>
              </tr>
              <tr>
                  <td><b>Postnummer:</b></td>
                  <td><input type="number" placeholder="Postnummer" ref="postnrSign" required /></td>
              </tr>
              <tr>
                  <td><b>Poststed: </b></td>
                  <td><input type="text" placeholder="Poststed" ref="poststedSign" required /></td>
              </tr>
              <tr>
                  <td><b>Telefon:</b></td>
                  <td><input type="text" placeholder="Telefon" ref="telefonSign" required /></td>
              </tr>
              <tr>
                  <td><b>Admin Status:</b></td>
                  <td><select ref="adminStat">
                      <option value="0">Nei</option>
                      <option value="1">Ja</option>
                  </select></td>
              </tr>

              </tbody>
          </table>
          <Button bsStyle="info" id="SignUp">Registrer</Button>
      </div>
    );
  }

  componentDidMount() {
      // pågrunn av bs style så må vi hente button med getElementByID
      let btn = document.getElementById("SignUp");
    btn.onclick = () => {
          // Lager object for enklere henting av data i querien.
      let newUser = {
        epost: this.refs.epostSign.value,
        etternavn: this.refs.etternavnSign.value,
        fornavn: this.refs.fornavnSign.value,
        passord: this.refs.passordSign.value,
        adresse: this.refs.adresseSign.value,
        postnummer: this.refs.postnrSign.value,
        poststed: this.refs.poststedSign.value,
        telefon: this.refs.telefonSign.value,
        adminStat: this.refs.adminStat.value
      };

      // querien.
      queries.newUserQuery(newUser).then(() => {
          this.refs.epostSign.value = "";
          this.refs.etternavnSign.value = "";
          this.refs.fornavnSign.value = "";
          this.refs.passordSign.value = "";
          this.refs.postnrSign.value = "";
          this.refs.poststedSign.value = "";
          this.refs.telefonSign.value = "";
          this.refs.adresseSign.value = "";
          // Alerter bruker om at han har blitt lagt til i godkjennings listen.
        alert('Registreringen din har  blitt sendt til en admin for å bli godkjent \nKontakt din admin om du lurer på noe')
      });

    };
  }
}

export default Skjema;
