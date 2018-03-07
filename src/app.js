import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';
import { queries } from './services';

class Skjema extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div>
                    <span>Epost: <input type="text" placeholder="Epost" ref="epost" /></span><br/>
                    <span>Passord: <input type="password" placeholder="Passord" ref="passord"/></span><br/>
                    <button ref="loginBtn">Login</button>
                </div>
                <div>
                    <span>Epost: <input type="text" placeholder="Epost" ref="epostSign" required /></span><br/>
                    <span>Etternavn: <input type="text" placeholder="Etternavn" ref="etternavnSign" required/></span><br/>
                    <span>Fornavn: <input type="text" placeholder="Fornavn" ref="fornavnSign" required/></span><br/>
                    <span>Passord: <input type="password" placeholder="Passord" ref="passordSign" required/></span><br/>
                    <span>Addresse: <input type="text" placeholder="Addresse" ref="addresseSign" required/></span><br/>
                    <span>Telefon: <input type="text" placeholder="Telefon" ref="telefonSign" required/></span><br/>
                    <button ref="SignUp">Registrer</button>
                </div>
            </div>

        )
    }

    componentDidMount() {
        this.refs.loginBtn.onclick = () => {
            queries.loginQuery(this.refs.epost.value, this.refs.passord.value, () => {
            });
            this.refs.epost.value = '';
            this.refs.passord.value = '';
            this.forceUpdate();
        }

        this.refs.SignUp.onclick = () => {
            let newUser = {
                epost: this.refs.epostSign.value,
                etternavn: this.refs.etternavnSign.value,
                fornavn: this.refs.fornavnSign.value,
                passord: this.refs.passordSign.value,
                address: this.refs.addresseSign.value,
                telefon: this.refs.telefonSign.value
            };
            queries.newUserQuery(newUser, () => {

            });
            this.refs.epostSign.value = '';
            this.refs.etternavnSign.value = '';
            this.refs.fornavnSign.value = '';
            this.refs.passordSign.value = '';
            this.refs.addresseSign.value = '';
            this.refs.telefonSign.value = '';
        }


    }

}





// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.
ReactDOM.render((
    <HashRouter>
        <div>
            <Skjema />
            <Switch>
                <Route exact path='/'/>
            </Switch>
        </div>
    </HashRouter>
), document.getElementById('root'));

