import React from 'react';
import {NavLink} from 'react-router-dom';
import {queries} from './services.js';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

            let brukerLoggetInn = queries.brukerLoggetInn();
            if (brukerLoggetInn) {
                return (
                    <div>
                        <NavLink activeStyle={{color: 'green'}} to='/home'>Home</NavLink>{' '}
                        <NavLink activeStyle={{color: 'green'}} to='/kalender'>Kalender</NavLink>{' '}
                        <NavLink activeStyle={{color: 'green'}} to='/profile'>Profile</NavLink>{' '}
                        <span>
                        <input type="text" placeholder="Søk" ref="searchInput"/><button ref="searchButton"><NavLink activeStyle={{color: 'green'}} to='/searchResult'>Søk</NavLink></button>
                    </span>
                        <NavLink activestyle={{color: 'green'}} exact to="/">Sign out</NavLink>
                    </div>
                );
            }
            else {
                return(
                <div>
                    <NavLink activestyle={{color: 'green'}} exact to="/login">Logg inn</NavLink>
                    <NavLink activestyle={{color: 'green'}} exact to="/signup">Registrer</NavLink>
                </div>)
            }


    }

    componentDidMount () {
        this.ref.signout.onclick = () => {
            localStorage.removeItem('loggetInnBruker');
            history.push('/login')
        }
    }



}



export default Menu;
