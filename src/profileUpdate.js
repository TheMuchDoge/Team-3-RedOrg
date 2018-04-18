import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Table, Button} from "react-bootstrap"

class profileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.brukerID;
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
              </tbody>
          </table>
          <Button bsStyle="info" id="saveInfo">Endre</Button>
      </div>
    );
  }

  componentDidMount() {
    queries.hentBruker(this.id).then(result => {
      this.bruker = result[0];
      this.forceUpdate();

      this.refs.epostSign.value = result[0].epost;
      this.refs.etternavnSign.value = result[0].etternavn;
      this.refs.fornavnSign.value = result[0].fornavn;
      this.refs.passordSign.value = result[0].passord;
      this.refs.adresseSign.value = result[0].adresse;
      this.refs.postnrSign.value = result[0].postNr;
      this.refs.poststedSign.value = result[0].postSted;
      this.refs.telefonSign.value = result[0].tlf;
    });

        let saveInfo = document.getElementById("saveInfo");
    saveInfo.onclick = () => {

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
          adminStat: this.bruker.adminStat
      };
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
