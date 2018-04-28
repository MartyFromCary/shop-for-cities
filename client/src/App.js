import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch
  //  Redirect,
  // withRouter
} from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
//import Nav from "./components/Nav";
/*
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake asyn
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;
class LLogin extends Component {
  state = { redirectToReferrer: false };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({ redirectToReferrer: true }));
    });
  };
  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>Your must login to view this page at {from.pathname}</p>
        <button onClick={this.login}>LOGIN</button>
      </div>
    );
  }
}
const PrivateRoute = withRouter(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
));
const AuthButton = ({ history }) => {
  return fakeAuth.isAuthenticated === true ? (
    <p>
      Welcome!
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign Out
      </button>
    </p>
  ) : (
    <p>You are not logged in</p>
  );
};
*/
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/*
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Proctected Page</Link>
            </li>
          </ul>
          <Route exact path="/public" component={Public} />
          <Route exact path="/login" component={LLogin} />
          <PrivateRoute path="/protected" component={Protected} />
          */}
          {
            /**/
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/saved" component={Saved} />
            </Switch>
            /**/
          }
        </div>
      </Router>
    );
  }
}

export default App;