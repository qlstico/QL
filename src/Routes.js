import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { routeNames } from './constants/routeNames';
import { Login } from './components';


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path={routeNames.home} component={Login} />
      </Switch>
    );
  }
}

export default Routes;
