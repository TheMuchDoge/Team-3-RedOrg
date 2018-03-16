import React from 'react';
import {NavLink} from 'react-router-dom';
import {queries} from './services.js';


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let brukerLoggetInn = queries.brukerLoggetInn();
        if (brukerLoggetInn) {
            return (
                <div>
                    <NavLink activeStyle={{color: 'green'}} exact to='/home'>Home</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} exact to='/kalender'>Kalender</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} exact to='/profile'>Profile</NavLink>{' '}
                    <NavLink activestyle={{color: 'green'}} exact to="/login">Sign out</NavLink>
                </div>

            );
        }
        return (
            <div>
                <NavLink activeStyle={{color: 'green'}} exact to='/login'>Logg Inn</NavLink>{' '}
                <NavLink activeStyle={{color: 'green'}} exact to='/signUp'>Registrer</NavLink>{' '}
            </div>
        );

    }


}


export default Menu;

