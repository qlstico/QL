import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Form from './components/reuse/Form';

const Routes = () => (
  <App>
    <Switch>
      <Route path={routes.Home} component={Form} />
    </Switch>
  </App>
);

export default Routes;
