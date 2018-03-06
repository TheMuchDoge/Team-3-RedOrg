import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';
import { queries } from './services';





// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.
ReactDOM.render((
  <p>Hello World</p>
), document.getElementById('root'));
