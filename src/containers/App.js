import '../assets/css/App.css';
import React, { Component } from 'react';
import Routes from '../Routes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, QLstico!</h1>
        <h1>Redfining databse access starts here!</h1>
        <Routes />
      </div>
    );
  }
}

export default App;
