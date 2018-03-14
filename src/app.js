import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';
import Skjema  from './loginSkjema';
import Menu from './menu';
import SearchResult from './SearchResult';
import Kalender from './Kalender';


// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.
ReactDOM.render((
    <HashRouter>
        <div>
            <Menu/>
            <Switch>
                <Route exact path='/login' component={Skjema}/>
                <Route exact path='/searchResult' component={SearchResult}/>
                <Route exact path='/kalender' component={Kalender}/>
            </Switch>
        </div>
    </HashRouter>
), document.getElementById('root'));

