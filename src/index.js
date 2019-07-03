import React from "react";
import { render } from "react-dom";
import App from "./containers/App";
import { HashRouter } from "react-router-dom";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
