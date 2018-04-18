import React from "react";
import Menu from "./menu";
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
      </div>


    );
  }

  componentDidMount() {
      var btn = document.getElementById("loginBtn")
    btn.onclick = () => {
      queries.loginQuery(this.refs.epost.value  , this.refs.passord.value).then(() => {
        history.push("/home");
      });
      this.refs.epost.value = "";
      this.refs.passord.value = "";
    };
  }
}

export default Login;
