import React, { useContext, useState, useEffect } from "react";
import firebase from "./firebase";
import { GlobalContext } from "./GlobalProvider";

export default function Report() {
  const { expense, setExpense } = useContext(GlobalContext);
  const [year, setYear] = useState(new Date().toDateString().split(" ")[3]);
  const [month, setMonth] = useState("");
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
    if (!month) {
      //calculate this year with all month
      return <p>{year}</p>;
    }

    return <p>hahaha</p>;
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
      <div className="report-table">
        <p>this is report rable</p>
        {renderReport()}
      </div>
    </div>
  );
}
