import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { routeNames } from "./constants/routeNames";
import { Login, DBCard } from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routeNames.home} component={Login} />
        <Route exact path={routeNames.allDBs} component={DBCard} />
      </Switch>
    );
  }
}

export default Routes;
