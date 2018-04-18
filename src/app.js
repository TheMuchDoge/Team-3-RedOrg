import React from "react";
import ReactDOM from "react-dom";
import { Link, HashRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";
import Menu from "./menu";
import SearchResult from "./SearchResult";
import Kalender from "./Kalender";
import Skjema from "./SignUp";
import AdminSite from "./adminSite";
import profileUpdate from "./profileUpdate";
import createEvent from "./createEvent";
import event from "./event";

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Skjema} />
        <Route exact path="/profile/:brukerID" component={Profile} />
        <Route exact path="/searchResult/:searchInput" component={SearchResult} />
        <Route exact path="/kalender" component={Kalender} />
        <Route exact path="/adminSite" component={AdminSite} />
        <Route exact path="/profileUpdate/:brukerID" component={profileUpdate} />
        <Route exact path="/createEvent" component={createEvent} />
        <Route exact path="/event/:eventID" component={event} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
