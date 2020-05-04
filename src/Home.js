import React, { useState, useContext } from "react";
import { GlobalContext } from "./GlobalProvider";
import { Link } from "react-router-dom";

import SpendList from "./components/SpendList";
import SpendForm from "./components/SpendForm";

export default function Home() {
  const [showAdd, setShowAdd] = useState(false);
  const { time, setTime } = useContext(GlobalContext);
  // console.log(expense);
  return (
    <>
      <section className="home-head-section">
        <button className="btn-add" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "x" : "+"}
        </button>
        <Link to="/report">
          <button className="btn-report">R</button>
        </Link>

        <p className="home-title">TRUE EXPENSE v0.1</p>
        <div className="home-button-selection">
          <button
            style={{ background: time === "today" ? "#18a3e4" : "#fff" }}
            onClick={() => setTime("today")}
          >
            TODAY
          </button>
          <button
            style={{ background: time === "this_month" ? "#18a3e4" : "#fff" }}
            onClick={() => setTime("this_month")}
          >
            THIS MONTH
          </button>
        </div>
        <h4 className="current-amount">20.000.000</h4>
      </section>

      <SpendList />
      <SpendForm showAdd={showAdd} closeShowAdd={() => setShowAdd(false)} />
    </>
  );
}
