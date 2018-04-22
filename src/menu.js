import React from "react";
import { NavLink } from "react-router-dom";
import { queries } from "./services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();
import {Button, Glyphicon} from "react-bootstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Henter brukeren som er logget inn.
      let brukerLoggetInn = queries.brukerLoggetInn();

      // Hvis brukeren er logget inn så ska denne menu-en vises.
      if (brukerLoggetInn) {
          // Og hvis brukeren har adminStat så få den tilgang til en admin side (godkjenning).
          if (brukerLoggetInn.adminStat) {
              // Returner Navlink til hver av de komponentene.
              // Første <span> er for søke funksjonen. Den sender en query til db-en og lagrer det i localStorage
              // og sender brukeren videre til searchResults.
              return (
                  <div className="menu">
                      <Button onClick={ () => {
                          window.history.back();
                          this.forceUpdate();
                      }}><Glyphicon glyph="arrow-left" style={{color:"#dd3636"}}/></Button>
                      <NavLink  to="/kalender">
                          <Button><Glyphicon glyph="calendar" style={{color:"#dd3636"}}/> Kalender</Button>
                      </NavLink>{" "}
                      <NavLink  to={"/profile/" + brukerLoggetInn.brukerID}>
                          <Button><Glyphicon glyph="user" style={{color:"#dd3636"}}/> Profil</Button>
                      </NavLink>{" "}
                      <NavLink to="/adminsite">
                          <Button>Admin Side</Button>
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
                          <Glyphicon glyph="search" style={{color:"red"}}/>
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
                          ><Glyphicon glyph="log-out" style={{color:"#dd3636"}}/> Sign out
                          </Button>
                      </NavLink>
                  </div>
              );
          } else {
              // Menu hvis brukeren er logget inn, men IKKE adminStat.
              // Samme som forrige menu, bare uten "Admin stuff" siden.
              return (
                  <div className="menu">
                      <Button onClick={ () => {
                          window.history.back();
                          this.forceUpdate();
                      }}><Glyphicon glyph="arrow-left" style={{color:"#dd3636"}}/></Button>
                      <NavLink  to="/kalender">
                          <Button><Glyphicon glyph="calendar" style={{color:"#dd3636"}}/> Kalender</Button>
                      </NavLink>{" "}
                      <NavLink  to={"/profile/" + brukerLoggetInn.brukerID}>
                          <Button><Glyphicon glyph="user" style={{color:"#dd3636"}}/> Profil</Button>
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
                          <Glyphicon glyph="search" style={{color:"#dd3636"}}/>
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
                          ><Glyphicon glyph="log-out" style={{color:"#dd3636"}}/> Sign out
                          </Button>
                      </NavLink>
                  </div>
              );
          }
      } else {
          // Hvis brukeren ikke er logget inn så vis denne logg inn / register menu.
          return (
              <div className="menu">
                  <NavLink to="/login">
                      <Button><Glyphicon glyph="log-in" style={{color:"#dd3636"}}/> Logg inn</Button>
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
