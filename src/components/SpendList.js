import React, { useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
import { formatNumber } from "../reusables";

function SpendList() {
  const { expense, time } = useContext(GlobalContext);

  function renderSpendList() {
    const date = new Date().toDateString();
    const dateArray = date.split(" ");
    //get category available
    const categoryAvail = [];
    for (let item of expense) {
      if (!categoryAvail.includes(item.category)) {
        categoryAvail.push(item.category);
      }
    }
    let categoryObjects = categoryAvail.map((item) => {
      return {
        category: item,
        amount: 0,
      };
    });

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

    //calculate based on categoryAvail and categoryByTime
    for (let i = 0; i < categoryObjects.length; i++) {
      let category = categoryObjects[i];
      categoryByTime.forEach((item) => {
        if (category.category === item.category) {
          categoryObjects[i].amount += item.amount;
        }
      });
    }

    //console.log(categoryByTime);
    if (categoryByTime.length < 1) {
      categoryObjects = [];
    }
    categoryObjects = categoryObjects.filter((item) => {
      return item.amount !== 0;
    });

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
