import React from "react";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <section className="home-head-section">
        <p className="home-title">True Expense</p>
        <div className="home-button-selection">
          <button>TODAY</button>
          <button>THIS MONTH</button>
        </div>

        <h4 className="current-amount">20.000</h4>
      </section>
    </div>
  );
}

export default App;
