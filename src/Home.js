import React, { useState, useContext } from "react";
import { GlobalContext } from "./GlobalProvider";
import { Link } from "react-router-dom";
import { formatNumber } from "./reusables";

import SpendList from "./components/SpendList";
import SpendForm from "./components/SpendForm";

export default function Home() {
  const [showAdd, setShowAdd] = useState(false);
  const { time, setTime, expense } = useContext(GlobalContext);
  function calculateTotal() {
    const date = new Date().toDateString();
    const dateArray = date.split(" ");
    let categoryByTime = [];
    if (time === "today") {
      const today = dateArray[2];
      const month = dateArray[1];
      const year = dateArray[3];

      categoryByTime = expense.filter((item) => {
        return item.day === today && item.month === month && item.year === year;
      });
    }
    if (time === "this_month") {
      const month = dateArray[1];
      const year = dateArray[3];

      categoryByTime = expense.filter((item) => {
        return item.month === month && item.year === year;
      });
    }
    const arrayAmount = categoryByTime.map((item) => {
      return item.amount;
    });
    const totalAmount = arrayAmount.reduce((a, b) => {
      return a + b;
    }, 0);

    return formatNumber(totalAmount);
  }
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
        <h4 className="current-amount">Rp. {calculateTotal()}</h4>
      </section>

      <SpendList />
      <SpendForm showAdd={showAdd} closeShowAdd={() => setShowAdd(false)} />
    </>
  );
}
