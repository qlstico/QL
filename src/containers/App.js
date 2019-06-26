import '../assets/css/App.css';
import React, { Component } from 'react';
import Routes from '../Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <h1>QLstico!</h1>
        <Routes />
      </div>
    );
  }
}

export default App;
