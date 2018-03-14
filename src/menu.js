import React from 'react';
import {NavLink} from 'react-router-dom';
import {queries} from './services.js';


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


            return (
                <div>
                    <NavLink activeStyle={{color: 'green'}} exact to='/'>Home</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} exact to='/kalender'>Kalender</NavLink>{' '}
                    <NavLink activeStyle={{color: 'green'}} to='/login'>Login</NavLink>{' '}
                    <span>
                        <input type="text" placeholder="Søk" ref="searchInput"/><button ref="searchButton"><NavLink activeStyle={{color: 'green'}} to='/searchResult'>Søk</NavLink></button>
                    </span>
                    <NavLink activestyle={{color: 'green'}} exact to="/">Sign out</NavLink>
                </div>
            );

    }

    componentDidMount () {

        this.refs.searchButton.onclick = () => {
            if(this.refs.searchInput.value === '') {
                alert('Vennligst fyll inn noe for å søke');
            }
            else {
                queries.searchQuery(this.refs.searchInput.value, (result) => {
                    localStorage.setItem('searchResults', JSON.stringify(result));
                });
            }
        }
    }


}



export default Menu;
