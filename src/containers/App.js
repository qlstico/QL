import '../assets/css/App.css';
import React, { Component } from 'react';
import Routes from '../Routes';
import { PrimarySearchAppBar, TablesProvider } from '../components/';

class App extends Component {
  render() {
    return (
      <TablesProvider>
        <div>
          <PrimarySearchAppBar />
          <Routes />
        </div>
      </TablesProvider>
    );
  }
}

export default App;
