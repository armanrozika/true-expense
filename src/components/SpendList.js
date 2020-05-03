import React, { useContext } from "react";
import { GlobalContext } from "../GlobalProvider";

function SpendList() {
  const [expense, setExpense] = useContext(GlobalContext);
  console.log(expense);
  return (
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
  );
}

export default SpendList;
