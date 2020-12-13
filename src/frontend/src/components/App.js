import React, {Component} from "react";
import {render} from "react-dom";
import {Container} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Basic react config
      </header>
    </div>
  );
}

const appDiv = document.getElementById("app");
render(
    <App />
    , appDiv)

export default App;
