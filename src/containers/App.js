import '../assets/css/App.css';
import React, { Component } from 'react';
import Routes from '../Routes';
import PrimarySearchAppBar from '../components/reuse/Header';

class App extends Component {
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <Routes />
      </div>
    );
  }
}

export default App;
