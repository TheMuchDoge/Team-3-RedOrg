import React from 'react';
import { NavLink} from 'react-router-dom';
import {queries} from './services.js';

class Menu extends React.Component {
    render() {


            return (
                <div>
                    <NavLink activeStyle={{color: 'green'}} exact to='/'>Home</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} exact to='/'>Arrangement</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} to='/login'>Login</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} to='/sok'>Søk</NavLink>{' '}
                    <input type="text" placeholder="Søk" ref="searchInput"/><button ref="searchButton">Søk</button>
                </div>
            );

    }

    componentDidMount () {
        this.refs.searchButton.onclick = () => {
            if(this.refs.searchInput.value === '') {
                alert('Vennligst fyll inn noe for å søke');
            }
            else {
                queries.searchQuery(this.refs.searchInput.value, () => {});
            }
        }
    }


}

export default Menu;