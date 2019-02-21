import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux";
import Auth from "./util/auth";
import NotFound from "./components/NotFound";

import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import User from "./routes/Users/List";
import EditUser from "./routes/Users/Edit";
import NewUser from "./routes/Users/New";
import Profile from "./routes/Users/Profile";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />
              <Route exact path="/" component={e => Auth.authorize(Dashboard, e, store, 2)} />
              <Route exact path="/profile" component={e => Auth.authorize(Profile, e, store, 2)} />
              <Route exact path="/user" component={e => Auth.authorize(User, e, store, 1)} />
              <Route exact path="/user/new" component={e => Auth.authorize(NewUser, e, store, 1)} />
              <Route exact path="/user/edit/:id" component={e => Auth.authorize(EditUser, e, store, 1)} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));