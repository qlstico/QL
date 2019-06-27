import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { routeNames } from './constants/routeNames';
import Main from './containers/Main';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path={routeNames.home} component={Main} />
      </Switch>
    );
  }
}

export default Routes;
