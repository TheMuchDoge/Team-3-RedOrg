import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';
import { queries } from './services';

class LoginSkjema extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(
            <div>
                <span>Epost: <input type="text" placeholder="Epost" ref="epost"></input></span><br/>
                <span>Passord: <input type="password" placeholder="Passord" ref="passord"></input></span><br/>
                <button>Login</button>
            </div>
        )
    }

    componentDidMount() {
        queries.getCustomers((result) => {
            console.log(result);
        })
    }

}






// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.
ReactDOM.render((
    <HashRouter>
        <div>
            <LoginSkjema />
            <Switch>
                <Route exact path='/'  />
            </Switch>
        </div>
    </HashRouter>
), document.getElementById('root'));

