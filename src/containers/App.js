import "../assets/css/App.css";
import React, { Component } from "react";
import Routes from "../Routes";
import { PrimarySearchAppBar, DbRelatedProvider, Footer } from "../components/";

class App extends Component {
  render() {
    return (
      <DbRelatedProvider>
        <div>
          <PrimarySearchAppBar />
          <Routes />
          <Footer />
        </div>
      </DbRelatedProvider>
    );
  }
}

export default App;
