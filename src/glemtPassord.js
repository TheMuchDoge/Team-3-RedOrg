import React from "react";
import { NavLink } from "react-router-dom";
import { queries } from "./services";
import {Button} from "react-bootstrap"
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class glemtPassord extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LoginDiv">
                <table>
                    <tbody>
                    <tr>
                        <td><b>Epost: </b></td>
                        <td><input type="text" placeholder="Epost" ref="epost" /></td>
                    </tr>
                    </tbody>
                </table>
                <Button bsStyle="info" id="loginBtn">Få passord</Button>
            </div>


        );
    }

    componentDidMount() {
        // grunnet bs Style så må vi hente btn
        let btn = document.getElementById("loginBtn");
        btn.onclick = () => {
            // Login query, og sender brukern til profile.
            queries.hentPassord(this.refs.epost.value).then((passord) => {
                alert("Ditt passord er: \n" + passord )
                history.push("/login/");
            });
            this.refs.epost.value = "";
        };
    }
}

export default glemtPassord;
