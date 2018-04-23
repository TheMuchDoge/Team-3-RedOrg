import React from "react";
import { NavLink } from "react-router-dom";
import { queries } from "./services";
import {Button} from "react-bootstrap"
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

          <div className="LoginDiv">
              <h1 style={{color:"#dd3636"}}>RedOrg</h1>
              <table>
                  <tbody>
                  <tr>
                      <td><b>Epost: </b></td>
                      <td><input type="text" placeholder="Epost" ref="epost" /></td>
                  </tr>
                  <tr>
                      <td><b>Passord: </b></td>
                      <td><input type="password" placeholder="Passord" ref="passord" /></td>
                  </tr>
                  </tbody>
              </table>
              <Button bsStyle="info" id="loginBtn">Login</Button>
              <NavLink exact to="/glemtPassord">Glemt passord?</NavLink>
          </div>
    );
  }

  componentDidMount() {
      // grunnet bs Style så må vi hente btn
      let btn = document.getElementById("loginBtn");
    btn.onclick = () => {
          // Login query, og sender brukern til profile.
      queries.loginQuery(this.refs.epost.value  , this.refs.passord.value).then((id) => {
        history.push("/profile/"+id);
      });
      this.refs.epost.value = "";
      this.refs.passord.value = "";
    };
  }
}

export default Login;
