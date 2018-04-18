import React from "react";
import { NavLink } from "react-router-dom";
import { queries } from "./services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Button, Glyphicon} from "react-bootstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.activeStyle ={
        bsStyle:"success"
    }
  }

  render() {
      let brukerLoggetInn = queries.brukerLoggetInn();

      if (brukerLoggetInn) {
          if (brukerLoggetInn.adminStat) {
              return (
                  <div className="menu">
                      <Button onClick={ () => {
                          window.history.back();
                          this.forceUpdate();
                      }}><Glyphicon glyph="arrow-left"/></Button>
                      <NavLink  to="/kalender">
                          <Button>Kalender</Button>
                      </NavLink>{" "}
                      <NavLink  to={"/profile/" + brukerLoggetInn.brukerID}>
                          <Button>Profile</Button>
                      </NavLink>{" "}
                      <NavLink to="/adminsite">
                          <Button>Admin Stuff</Button>
                      </NavLink>{" "}
                      <span>
                        <input type="text" placeholder="Søk" ref="searchInput"/>
                        <Button
                            ref="searchButton"
                            onClick={() => {
                                if (this.refs.searchInput.value === "") {
                                    alert("Vennligst fyll inn noe for å søke");
                                } else {
                                    queries.searchQuery(this.refs.searchInput.value).then(result => {
                                        localStorage.setItem("searchResults", JSON.stringify(result));

                                        history.push("/searchResult/" + this.refs.searchInput.value);
                                    });
                                }
                            }}
                        >
                          <Glyphicon glyph="search"/>
                        </Button>
                      </span>
                      <NavLink  exact to="/login">
                          <Button
                              ref="logoutButton"
                              onClick={() => {
                                  localStorage.removeItem("loggetInnBruker"); // Delete User-object from browser
                                  history.push("/login");
                                  this.forceUpdate();
                              }}
                          >Sign out
                          </Button>
                      </NavLink>
                  </div>
              );
          } else {
              return (
                  <div className="menu">
                      <Button onClick={ () => {
                          window.history.back();
                          this.forceUpdate();
                      }}><Glyphicon glyph="arrow-left"/></Button>
                      <NavLink  to="/kalender">
                          <Button>Kalender</Button>
                      </NavLink>{" "}
                      <NavLink  to={"/profile/" + brukerLoggetInn.brukerID}>
                          <Button>Profile</Button>
                      </NavLink>{" "}
                      <span>
                        <input type="text" placeholder="Søk" ref="searchInput"/>
                        <button
                            ref="searchButton"
                            onClick={() => {
                                if (this.refs.searchInput.value === "") {
                                    alert("Vennligst fyll inn noe for å søke");
                                } else {
                                    queries.searchQuery(this.refs.searchInput.value).then(result => {
                                        localStorage.setItem("searchResults", JSON.stringify(result));

                                        history.push("/searchResult/" + this.refs.searchInput.value);
                                    });
                                }
                            }}
                        >
                          <Glyphicon glyph="search"/>
                        </button>
                      </span>
                      <NavLink  exact to="/login">
                          <Button
                              ref="logoutButton"
                              onClick={() => {
                                  localStorage.removeItem("loggetInnBruker"); // Delete User-object from browser
                                  history.push("/login");
                                  this.forceUpdate();
                              }}
                          >Sign out
                          </Button>
                      </NavLink>
                  </div>
              );
          }
      } else {
          return (
              <div className="menu">
                  <NavLink to="/login">
                      <Button>Logg inn</Button>
                  </NavLink>
                  <NavLink to="/signup">
                      <Button>Registrer</Button>
                  </NavLink>
              </div>
          );
      }
  }

}

export default Menu;
