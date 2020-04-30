import React, { useState } from "react";

import "./App.scss";

function App() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="App">
      <section className="home-head-section">
        <button className="btn-add" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "x" : "+"}
        </button>
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

      <section
        className={`component-add ${showAdd ? "bottom-0" : "bottom-min-100"}`}
      >
        <select name="" id="">
          <option value="">Food</option>
          <option value="">Snack</option>
        </select>
        <input type="text" placeholder="Amount" />
        <button>submit</button>
      </section>
    </div>
  );
}

export default App;
