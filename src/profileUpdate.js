import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class profileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.brukerID;
    this.bruker = {};

  }

  render() {
    return (
      <div>
        <span>
          Epost: <input type="text" ref="epostSign" />
        </span>
        <br />
        <span>
          Etternavn: <input type="text" ref="etternavnSign" />
        </span>
        <br />
        <span>
          Fornavn: <input type="text" ref="fornavnSign" />
        </span>
        <br />
        <span>
          Passord: <input type="password" ref="passordSign" />
        </span>
        <br />
        <span>
          Adresse: <input type="text" ref="adresseSign" />
        </span>
        <br />
        <span>
          Postnummer: <input type="text" ref="postnrSign" />
        </span>
        <br />
        <span>
          Poststed: <input type="text" ref="poststedSign" />
        </span>
        <br />
        <span>
          Telefon: <input type="text" ref="telefonSign" />
        </span>
        <br />
        <button ref="saveInfo">Endre</button>
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
      /*this.refs.postnrSign.value = postkode.postNr;
            this.refs.poststedSign.value = postkode.postSted;*/
      this.refs.telefonSign.value = result[0].tlf;
    });

    this.refs.saveInfo.onclick = () => {
      let newInfo = {
        epost: this.refs.epostSign.value,
        etternavn: this.refs.etternavnSign.value,
        fornavn: this.refs.fornavnSign.value,
        passord: this.refs.passordSign.value,
        adresse: this.refs.adresseSign.value,
        /*this.refs.postnrSign.value = postkode.postNr;
                this.refs.poststedSign.value = postkode.postSted;*/
        tlf: this.refs.telefonSign.value,
        id: this.id
      };
      queries.updateQuery(newInfo).then(() => {
          let brukerLoggetInn = queries.brukerLoggetInn();
          console.log(brukerLoggetInn.brukerID + " ||| " + this.bruker.brukerID)
          if(brukerLoggetInn.brukerID === this.bruker.brukerID) {
              LocalStorage.removeItem('loggetInnBruker');
              localStorage.setItem("loggetInnBruker", JSON.stringify(newInfo));
              console.log('This user is schanger')
          }
          history.push("/home");
            this.forceUpdate();
      });
    };
  }
}
export default profileUpdate;
