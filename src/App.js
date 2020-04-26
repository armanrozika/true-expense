import React from "react";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <section className="home-head-section">
        <button className="btn-add">+</button>
        <button className="btn-report">R</button>
        <p className="home-title">TRUE EXPENSE v0.1</p>
        <div className="home-button-selection">
          <button>TODAY</button>
          <button>THIS MONTH</button>
        </div>
        <h4 className="current-amount">20.000.000</h4>
      </section>

      <section className="home-spend">
        <div className="category-spend">
          <h4>Food:</h4>
          <p>15.000</p>
        </div>
        <div className="category-spend">
          <h4>Snack:</h4>
          <p>5.000</p>
        </div>
        <div className="category-spend">
          <h4>Cigarette:</h4>
          <p>20.000</p>
        </div>
        <div className="category-spend">
          <h4>Kosan:</h4>
          <p>20.000</p>
        </div>
        <div className="category-spend">
          <h4>Fams:</h4>
          <p>20.000</p>
        </div>
        <div className="category-spend">
          <h4>Others:</h4>
          <p>20.000</p>
        </div>
      </section>
    </div>
  );
}

export default App;
