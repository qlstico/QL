import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { routeNames } from "./constants/routeNames";
import { Login, AllDBs, AllTables, MainPage } from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routeNames.pickDB} component={MainPage} />
        <Route exact path={routeNames.editDB} component={Login} />
        <Route exact path={routeNames.allDBs} component={AllDBs} />
        <Route exact path={routeNames.tables} component={AllTables} />
      </Switch>
    );
  }
}

export default Routes;
