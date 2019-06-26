import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { routeNames } from './constants/routeNames';
import Form from './components/reuse/Form';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path={routeNames.home} component={Form} />
      </Switch>
    );
  }
}

export default Routes;
