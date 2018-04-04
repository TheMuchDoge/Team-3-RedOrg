import React from "react";
import ReactDOM from "react-dom";
import { Link, HashRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Profile from "./profile";
import Menu from "./menu";
import SearchResult from "./SearchResult";
import Kalender from "./Kalender";
import Home from "./Home";
import Skjema from "./SignUp";
import profileUpdate from "./profileUpdate";

// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Skjema} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/searchResult" component={SearchResult} />
        <Route exact path="/kalender" component={Kalender} />
        <Route exact path="/profileUpdate" component={profileUpdate} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
