import React, { useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
import { formatNumber } from "../reusables";

function SpendList() {
  const { expense, time } = useContext(GlobalContext);

  function renderSpendList() {
    //get category available
    const categoryAvail = [];
    for (let item of expense) {
      if (!categoryAvail.includes(item.category)) {
        categoryAvail.push(item.category);
      }
    }
    const categoryObjects = categoryAvail.map((item) => {
      return {
        category: item,
        amount: 0,
      };
    });

    let categoryByTime = [];
    if (time === "today") {
      const date = new Date().toLocaleDateString();
      const dateArray = date.split("/");
      const today = dateArray[0];
      const month = dateArray[1];
      const year = dateArray[2];

      categoryByTime = expense.filter((item) => {
        return item.day === today && item.month === month && item.year === year;
      });
    }
    if (time === "this_month") {
      const date = new Date().toLocaleDateString();
      const dateArray = date.split("/");
      const month = dateArray[1];
      const year = dateArray[2];

      categoryByTime = expense.filter((item) => {
        return item.month === month && item.year === year;
      });
    }

    //calculate based on categoryAvail and categoryByTime
    for (let i = 0; i < categoryObjects.length; i++) {
      let category = categoryObjects[i];
      categoryByTime.forEach((item) => {
        if (category.category === item.category) {
          categoryObjects[i].amount += item.amount;
        }
      });
    }

    const list = categoryObjects.map((item) => {
      return (
        <div key={item.category} className="category-spend">
          <h4>{item.category.toUpperCase()}</h4>
          <p>{formatNumber(item.amount)}</p>
        </div>
      );
    });
    return list;
  }

  return <section className="home-spend">{renderSpendList()}</section>;
}

export default SpendList;
