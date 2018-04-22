import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Switch, Route } from "react-router-dom";

// Importer all komponenter som er laget og bruker
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
import eventUpdate from "./eventUpdate.js"
import glemtPassord from "./glemtPassord.js"

// Setter opp en switch for å navigere gjennom komponentene, ved hjelp av en menu.
ReactDOM.render(
  <HashRouter>
    <div>
      <Menu style={{position:"fixed"}}/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Skjema} />
        <Route exact path="/searchResult/:searchInput" component={SearchResult} />
        <Route exact path="/kalender" component={Kalender} />
        <Route exact path="/adminSite" component={AdminSite} />
        <Route exact path="/profile/:brukerID" component={Profile} />
        <Route exact path="/profileUpdate/:brukerID" component={profileUpdate} />
        <Route exact path="/createEvent" component={createEvent} />
        <Route exact path="/event/:eventID" component={event} />
        <Route exact path="/eventUpdate/:eventID" component={eventUpdate}/>
        <Route exact path="/glemtPassord" component={glemtPassord} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById("root"),
);
