import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history: HashHistory = createHashHistory();
import { User, queries } from './services';

class Menu extends React.Component <{}> {
  render() {
    // constructor(props) {
    //     super(props);
        let signedInUser: ?User = queries.getSignedInUser();
        if(signedInUser) {
          return (
            <div>
              <NavLink activeStyle={{color: 'green'}} to='/'>Hjem</NavLink>{' '}
              <NavLink activeStyle={{color: 'green'}} to={'/user/' + signedInUser.id}>{signedInUser.fornavn}</NavLink>{' '}
              <NavLink activeStyle={{color: 'green'}} to='/friends'>Friends</NavLink>{' '}
              <NavLink activeStyle={{color: 'green'}} to='/signout'>Sign Out</NavLink>{' '}
            </div>
          );
        }
        return (
            <div>
                <NavLink activeStyle={{ color: 'green'}} to='/login'>Logg inn</NavLink>{' '}
                <NavLink activeStyle={{ color: 'green'}} to='/signup'>Lag bruker</NavLink>{' '}
            </div>
          );
        }

        componentDidMount() {
          menu = this;
        }

        componentWillUnmount() {
          menu = null;
        }
      }

      let menu: ?Menu;

      class SignIn extends React.Component<{}> {
        refs: {
          signInUsername: HTMLInputElement,
          signInButton: HTMLButtonElement
        }

        render() {
          return (
            <div>
              Username: <input type='text' ref='signInUsername' />
              <button ref='signInButton'>Logg inn</button>
            </div>
          );
        }

    componentDidMount() {
      if(menu) menu.forceUpdate();

      this.refs.signInButton.onclick = () => {
        queries.signIn(this.refs.signInUsername.value).then(() => {
          history.push('/');
        }).catch((error: Error) => {
          if(errorMessage) errorMessage.set("Incorrect username");
        });
      };
    }
  }


// The Route-elements define the different pages of the application
// through a path and which component should be used for the path.
// The path can include a variable, for instance
// path='/customer/:customerId' component={CustomerDetails}
// means that the path /customer/5 will show the CustomerDetails
// with props.match.params.customerId set to 5.
// let root: ?HTMLElement = document.getElementById('root');
// if(root) {
//   ReactDOM.render((
//     <HashRouter>
//       <div>
//         <ErrorMessage />
//         <Menu />
//         <Switch>
//           <Route exact path='/signin' component={SignIn} />
//           <Route exact path='/signup' component={SignUp} />
//           <Route exact path='/signout' component={SignOut} />
//           <Route exact path='/' component={Home} />
//           <Route exact path='/friends' component={Friends} />
//           <Route exact path='/user/:id' component={UserDetails} />
//         </Switch>
//       </div>
//     </HashRouter>
//   ), root);
// }
