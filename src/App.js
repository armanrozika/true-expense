import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import Report from "./Report";

import "./App.scss";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/report" component={Report} />
      </div>
    </HashRouter>
  );
}

export default App;
