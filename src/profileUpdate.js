import React from "react";
import { queries } from "./services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class ErrorMessage extends React.Component {
  constructor() {
    super();

    this.message = "";
  }

  render() {
    // Only show when this.message is not empty
    let displayValue;
    if (this.message == "") displayValue = "none";
    else displayValue = "inline";

    return (
      <div style={{ display: displayValue }}>
        <b>
          <font color="red">{this.message}</font>
        </b>
        <button ref="closeButton">Close</button>
      </div>
    );
  }

  componentDidMount() {
    errorMessage = this;
    this.refs.closeButton.onclick = () => {
      this.message = "";
      this.forceUpdate();
    };
  }

  componentWillUnmount() {
    errorMessage = null;
  }

  set(message) {
    this.message = message;
    this.forceUpdate();
  }
}
let errorMessage;

class profileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id;
    this.user = {};
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
    let bruker = queries.brukerLoggetInn();
    let postkode = queries.brukerLoggetInn();
    let id = queries.brukerLoggetInn();

    this.refs.epostSign.value = bruker.epost;
    this.refs.etternavnSign.value = bruker.etternavn;
    this.refs.fornavnSign.value = bruker.fornavn;
    this.refs.passordSign.value = bruker.passord;
    this.refs.adresseSign.value = bruker.adresse;
    this.refs.postnrSign.value = postkode.postNr;
    this.refs.poststedSign.value = postkode.postSted;
    this.refs.telefonSign.value = bruker.tlf;

    this.refs.saveInfo.onclick = () => {
      //  if (profileUpdate) {
      queries
        .updateQuery({
          epost: this.refs.epostSign.value,
          etternavn: this.refs.etternavnSign.value,
          fornavn: this.refs.fornavnSign.value,
          passord: this.refs.passordSign.value,
          adresse: this.refs.adresseSign.value,
          postnr: this.refs.postnrSign.value,
          poststed: this.refs.poststedSign.value,
          tlf: this.refs.telefonSign.value,
          id: id
        })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          if (errorMessage) errorMessage.set("error editing profile:" + error.message);
        });
      //  }
    };
  }

  // update() {
  //
  //   queries.updateQuery(this.user).then((user) => {
  //     this.refs.epostSign.value = user.epostSign;
  //     this.refs.etternavnSign.value = user.etternavnSign;
  //     this.refs.fornavnSign.value = user.fornavnSign;
  //     this.refs.passordSign.value = user.passordSign;
  //     this.refs.adresseSign.value = user.adresseSign;
  //     this.refs.postnrSign.value = user.postnrSign;
  //     this.refs.poststedSign.value = user.poststedSign;
  //     this.refs.telefonSign.value = user.telefonSign;
  //   }).catch((error) => {
  //     if(errorMessage) errorMessage.set('Error editing profile: ' + error.message);
  //   });
  // }
  // queries.updateQuery(this.id).then(() => {
  //   this.refs.epostSign.value = "";
  //   this.refs.etternavnSign.value = "";
  //   this.refs.fornavnSign.value = "";
  //   this.refs.passordSign.value = "";
  //   this.refs.postnrSign.value = "";
  //   this.refs.poststedSign.value = "";
  //   this.refs.telefonSign.value = "";
  //   this.refs.adresseSign.value = "";
  // });
}

export default profileUpdate;
