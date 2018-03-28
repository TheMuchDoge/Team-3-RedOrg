import React from "react";
import { queries } from "./services";


class profileUpdate extends React.Component {
  constructor(props) {
      super(props);

      this.id = props.match.params.id;
      this.rediger = {};
  }

  render() {
    return (
      <div>
        <span>Epost: <input type="text" ref="epostSign" /></span><br/>
        <span>Etternavn: <input type="text" ref="etternavnSign" /></span><br/>
        <span>Fornavn: <input type="text" ref="fornavnSign" /></span><br/>
        <span>Passord: <input type="password" ref="passordSign" /></span><br/>
        <span>Adresse: <input type="text" ref="adresseSign" /></span><br/>
        <span>Postnummer: <input type='text' ref="postnrSign" /></span><br/>
        <span>Poststed: <input type='text' ref="poststedSign" /></span><br/>
        <span>Telefon: <input type="text" ref="telefonSign" /></span><br/>
        <button ref="saveInfo">Endre</button>
      </div>
    )
  }

update() {
  queries.updateQueries(this.id).then((rediger) => {
    this.refs.epostSign.value = rediger.epostSign;
    this.refs.etternavnSign.value = rediger.etternavnSign;
    this.refs.fornavnSign.value = rediger.fornavnSign;
    this.refs.passordSign.value = rediger.passordSign;
    this.refs.adresseSign.value = rediger.adresseSign;
    this.refs.postnrSign.value = rediger.postnrSign;
    this.refs.poststedSign.value = rediger.poststedSign;
    this.refs.telefonSign.value = rediger.telefonSign;
  }).catch((error) => {
    if(errorMessage) errorMessage.set('Error editing profile: ' + error.message);
  });
}

componentDidMount() {
  this.refs.saveInfo.onclick = () => {
    queries.updateQueries(
      this.id, this.refs.epostSign.valie, this.refs.etternavnSign.value, this.refs.fornavnSign.value, this.refs.passordSign.value,
      this.refs.adresseSign.value, this.refs.postnrSign.value, this.refs.poststedSign.value, this.refs.telefonSign.value).then(() =>{
        if(profileUpdate) profileUpdate.update();
      })catch((error) => {
        if(errorMessage) errorMessage.set('error editing profile:' + error.message);
      });
    }

    this.update();
  }

  // };
  // queries.updateQueries(newUser, () => {});
  // this.refs.epostSign.value = '';
  // this.refs.etternavnSign.value = '';
  // this.refs.fornavnSign.value = '';
  // this.refs.passordSign.value = '';
  // this.refs.adresseSign.value = '';
  // this.refs.postnrSign.value = '';
  // this.refs.poststedSign.value = '';
  // this.refs.telefonSign.value = '';
}


export default profileUpdate;
