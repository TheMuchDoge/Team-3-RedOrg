import React from "react";
import { queries } from './services';


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

                <span>Epost: <input type="text" placeholder="Epost" ref="epost" /></span><br/>
                <span>Passord: <input type="password" placeholder="Passord" ref="passord"/></span><br/>
                <button ref="loginBtn">Login</button>

            </div>

        )
    }

    componentDidMount() {


        this.refs.loginBtn.onclick = () => {
            queries.loginQuery(this.refs.epost.value, this.refs.passord.value, () => {});
            this.refs.epost.value = '';
            this.refs.passord.value = '';
            history.push('/home');

        }
    }

}
export default Login;