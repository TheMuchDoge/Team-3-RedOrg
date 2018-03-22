import React from "react";
import { queries } from './services';


class Skjema extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <span>Epost: <input type="text" placeholder="Epost" ref="epostSign" required /></span><br/>
                <span>Etternavn: <input type="text" placeholder="Etternavn" ref="etternavnSign" required/></span><br/>
                <span>Fornavn: <input type="text" placeholder="Fornavn" ref="fornavnSign" required/></span><br/>
                <span>Passord: <input type="password" placeholder="Passord" ref="passordSign" required/></span><br/>
                <span>Adresse: <input type="text" placeholder="Adresse" ref="adresseSign" required/></span><br/>
                <span>Postnummer: <input type='text' placeholder='Postnummer' ref="postnrSign" required/></span><br/>
                <span>Poststed: <input type='text' placeholder='Poststed' ref="poststedSign" required/></span><br/>
                <span>Telefon: <input type="text" placeholder="Telefon" ref="telefonSign" required/></span><br/>
                <button ref="SignUp">Registrer</button>
            </div>

        )
    }

    componentDidMount() {

        this.refs.SignUp.onclick = () => {
            let newUser = {
                epost: this.refs.epostSign.value,
                etternavn: this.refs.etternavnSign.value,
                fornavn: this.refs.fornavnSign.value,
                passord: this.refs.passordSign.value,
                adress: this.refs.adresseSign.value,
                postnummer: this.refs.postnrSign.value,
                poststed: this.refs.poststedSign.value,
                telefon: this.refs.telefonSign.value
            };
            queries.newUserQuery(newUser, () => {});
            this.refs.epostSign.value = '';
            this.refs.etternavnSign.value = '';
            this.refs.fornavnSign.value = '';
            this.refs.passordSign.value = '';
            this.refs.adresseSign.value = '';
            this.refs.postnrSign.value = '';
            this.refs.poststedSign.value = '';
            this.refs.telefonSign.value = '';
        }


    }

}
export default Skjema;
