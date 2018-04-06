import React from "react";
import { NavLink } from "react-router-dom";
import { queries } from "./services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let brukerLoggetInn = queries.brukerLoggetInn();

    if (brukerLoggetInn && brukerLoggetInn.adminStat) {
        return (
            <div>
                <NavLink activeStyle={{ color: "green" }} to="/home">
                    Home
                </NavLink>{" "}
                <NavLink activeStyle={{ color: "green" }} to="/kalender">
                    Kalender
                </NavLink>{" "}
                <NavLink activeStyle={{ color: "green" }} to="/profile">
                    Profile
                </NavLink>{" "}
                <NavLink activestyle={{ color: "green" }} exact to="/adminsite">
                    Admin Stuff
                </NavLink>{" "}
                <span>
                <input type="text" placeholder="Søk" ref="searchInput" />
                <button ref="searchButton" onClick={() => {
                    if(this.refs.searchInput.value === '') {
                        alert('Vennligst fyll inn noe for å søke');
                    }
                    else {
                        queries.searchQuery(this.refs.searchInput.value).then((result) => {
                            localStorage.setItem('searchResults', JSON.stringify(result));

                            history.push("/searchResult/" + this.refs.searchInput.value);
                        });
                    }
                }}>
                  søk
                </button>
              </span>
                <button
                    ref="logoutButton"
                    onClick={() => {
                        localStorage.removeItem("loggetInnBruker"); // Delete User-object from browser
                        history.push("/login");
                        this.forceUpdate();
                    }}
                >
                    <NavLink activestyle={{ color: "green" }} exact to="/login">
                        Sign out
                    </NavLink>
                </button>
            </div>
        )
    }

    else if (brukerLoggetInn) {
      return (
        <div>
          <NavLink activeStyle={{ color: "green" }} to="/home">
            Home
          </NavLink>{" "}
          <NavLink activeStyle={{ color: "green" }} to="/kalender">
            Kalender
          </NavLink>{" "}
          <NavLink activeStyle={{ color: "green" }} to="/profile">
            Profile
          </NavLink>{" "}
          <span>
            <input type="text" placeholder="Søk" ref="searchInput" />
            <button ref="searchButton" onClick={() => {
                if(this.refs.searchInput.value === '') {
                    alert('Vennligst fyll inn noe for å søke');
                }
                else {
                    queries.searchQuery(this.refs.searchInput.value).then((result) => {
                        localStorage.setItem('searchResults', JSON.stringify(result));
                        history.push('./searchResults/' + this.refs.searchInput.value);
                        this.forceUpdate();
                    });
                }
            }}>
              søk
            </button>
          </span>
          <button
            ref="logoutButton"
            onClick={() => {
              localStorage.removeItem("loggetInnBruker"); // Delete User-object from browser
              history.push("/login");
              this.forceUpdate();
            }}
          >
            <NavLink activestyle={{ color: "green" }} exact to="/login">
              Sign out
            </NavLink>
          </button>
        </div>
      );
    }
    else {
      return (
        <div>
          <NavLink activestyle={{ color: "green" }} to="/login">
            Logg inn
          </NavLink>
          <NavLink activestyle={{ color: "green" }} to="/signup">
            Registrer
          </NavLink>
        </div>
      );
    }
  }
}

export default Menu;
