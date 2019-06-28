import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { routeNames } from './constants/routeNames';
import { Login, AllDBs, AllTables } from './components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routeNames.home} component={Login} />
        <Route exact path={routeNames.allDBs} component={AllDBs} />
        <Route exact path={routeNames.tables} component={AllTables} />
      </Switch>
    );
  }
}

export default Routes;
