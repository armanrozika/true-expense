import React, { useContext, useState, useEffect } from "react";
import firebase from "./firebase";
import { GlobalContext } from "./GlobalProvider";
import { formatNumber } from "./reusables";

export default function Report() {
  const { expense, setExpense } = useContext(GlobalContext);
  const [year, setYear] = useState(new Date().toDateString().split(" ")[3]);
  const [month, setMonth] = useState(new Date().toDateString().split(" ")[1]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("expense")
      .onSnapshot((snapshot) => {
        const newExpense = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        const allMonths = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const years = [];
        let monthsObj = [];

        for (let i = 0; i < newExpense.length; i++) {
          if (!years.includes(newExpense[i].year)) {
            years.push(newExpense[i].year);
          }
          if (!monthsObj.includes(newExpense[i].month)) {
            monthsObj.push(newExpense[i].month);
          }
        }

        monthsObj.forEach((item, index) => {
          monthsObj[index] = {
            name: item,
            idx: allMonths.indexOf(item),
          };
        });

        function compare(a, b) {
          const idxA = a.idx;
          const idxB = b.idx;

          let comparison = 0;
          if (idxA > idxB) {
            comparison = 1;
          } else if (idxA < idxB) {
            comparison = -1;
          }
          return comparison * -1;
        }
        monthsObj.sort(compare);

        const months = [];
        for (let i = 0; i < monthsObj.length; i++) {
          if (!months.includes(monthsObj[i].name)) {
            months.push(monthsObj[i].name);
          }
        }

        //need to sort months and years
        years.sort();
        months.push("none");
        setAvailableMonths(months);
        setAvailableYears(years);
        setExpense(newExpense);
      });

    return () => unsubscribe();
  }, []);

  const renderReport = () => {
    if (expense.length < 1) {
      return;
    }
    //condition to render report

    if (month === "none") {
      //monthly report for selected year
      return <p>{year}</p>;
    } else {
      //daily report for selected month
      const filteredExpense = expense.filter((item) => {
        return item.year === year && item.month === month;
      });
      const expenseDate = [];
      filteredExpense.forEach((item) => {
        if (!expenseDate.includes(item.day)) {
          expenseDate.push(item.day);
        }
      });
      expenseDate.sort();
      const dateObjects = expenseDate.map((item) => {
        return {
          day: item,
          amount: 0,
        };
      });
      filteredExpense.forEach((item) => {
        dateObjects.forEach((val, i) => {
          if (item.day === val.day) {
            dateObjects[i].amount += item.amount;
          }
        });
      });
      //console.log(dateObjects);
      return (
        <div className="daily-parent">
          {dateObjects.map((item, i) => {
            return (
              <div key={i} className="daily-report">
                <p>{item.day}</p>
                <p>{formatNumber(item.amount)}</p>
                <button>detail</button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="report">
      <h4>Report</h4>
      <div className="report-parameter">
        <select
          name=""
          id=""
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {availableMonths.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          name=""
          id=""
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {availableYears.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="report-table">{renderReport()}</div>
    </div>
  );
}
