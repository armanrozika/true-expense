import React, { useContext } from "react";
import { GlobalContext } from "../GlobalProvider";

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

    //console.log(categoryByTime);
    const list = expense.map((item) => {
      return (
        <div key={item.id} className="category-spend">
          <h4>{item.category.toUpperCase()}</h4>
          <p>{item.amount}</p>
        </div>
      );
    });
    return list;
  }

  return <section className="home-spend">{renderSpendList()}</section>;
}

export default SpendList;
