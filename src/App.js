import React from "react";
import { HashRouter, Route } from "react-router-dom";

import { GlobalProvider } from "./GlobalProvider";

import Home from "./Home";
import Report from "./Report";

import "./App.scss";

function App() {
  return (
    <HashRouter>
      <GlobalProvider>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/report" component={Report} />
        </div>
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
