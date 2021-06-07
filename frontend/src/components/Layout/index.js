import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';

import Login from '../../screen/Login';

const Layout = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default Layout;