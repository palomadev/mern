import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux';
import Auth from '../util/auth';
import NotFound from '../components/NotFound';

import Login from './Login';
import Dashboard from './Dashboard';
import User from './Users/List';
import EditUser from './Users/Edit';
import NewUser from './Users/New';
import Profile from './Users/Profile';

const store = configureStore();
const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route exact path='/login' component={e => Auth.validate(Login, e, store)} />
                    <Route exact path='/' component={e => Auth.authorize(Dashboard, e, store, 2)} />
                    <Route exact path='/profile' component={e => Auth.authorize(Profile, e, store, 2)} />
                    <Route exact path='/user' component={e => Auth.authorize(User, e, store, 1)} />
                    <Route exact path='/user/new' component={e => Auth.authorize(NewUser, e, store, 1)} />
                    <Route exact path='/user/edit/:id' component={e => Auth.authorize(EditUser, e, store, 1)} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    </Provider>
);

export default hot(module)(App);
